const Minio = require("minio");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");

const minioClient = new Minio.Client({
  endPoint: "172.16.6.51",
  port: 9000,
  useSSL: false,
  accessKey: "www.winning.com.cn",
  secretKey: "www.winning.com.cn"
});

// const filename = "materials.json";
// const file = path.resolve(__dirname, "./../build/materials.json");
const filepath = "materials/";
const metaData = {
  "Content-Type": "application/octet-stream",
  "X-Amz-Meta-Testing": 1234,
  example: 5678
};

const handleJson = async () => {
  const createFileRes = await isFileExisted(
    path.resolve(__dirname, "./../build/list.json")
  );
  if (createFileRes) {
    await getListJson();
    await compareJSON();
    upload(
      filepath,
      "materials.json",
      path.resolve(__dirname, "./../build/materials.json")
    );
    upload(
      filepath,
      "list.json",
      path.resolve(__dirname, "./../build/list.json")
    );
  }
};

handleJson();

// 判断是否存在文件, 创建文件list.json
function isFileExisted() {
  return new Promise((resolve, reject) => {
    fs.access(path.resolve(__dirname, "./../build/list.json"), err => {
      if (err) {
        fs.appendFileSync(
          path.resolve(__dirname, "./../build/list.json"),
          "[]",
          "utf-8",
          err => {
            if (err) {
              return console.log(chalk.red("该文件不存在，重新创建失败！"));
            }
            console.log(chalk.red("文件不存在，已新创建"));
          }
        );
        reject(false);
      } else {
        resolve(true);
      }
    });
  }).catch(() => {
    return false;
  });
}
// get获取list.json数据，存入/build/list.json中
function getListJson() {
  return new Promise((reslove, reject) => {
    minioClient.fGetObject(
      "winex",
      "materials/list.json",
      path.resolve(__dirname, "./../build/list.json"),
      function(err) {
        if (!err) {
          reslove(true);
        } else {
          reject(false);
        }
      }
    );
  }).catch(() => {
    return false;
  });
}
// 读取list.json和materials.json中的数据比对覆盖
function compareJSON() {
  let materialJson = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "./../build/materials.json"),
      "utf-8"
    )
  );

  let listJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./../build/list.json"), "utf-8")
  );

  let tag = -1;
  listJson.forEach((listJsonItem, index) => {
    if (listJsonItem.key === materialJson.key) {
      isExist = index;
      tag = index;
    }
  });
  if (tag > -1) {
    listJson[tag] = materialJson;
  } else {
    listJson.push(materialJson);
  }
  console.log(tag, "tag");

  fs.writeFileSync(
    path.resolve(__dirname, "./../build/list.json"),
    JSON.stringify(listJson, null, 4),
    "utf-8"
  );
}

// upload minio oss
function upload(filepath, filename, file) {
  minioClient.fPutObject("winex", filepath + filename, file, metaData, function(
    err,
    etag
  ) {
    // console.log(err, etag); // err should be null
    if (!err) {
      console.log(chalk.green("上传成功"));
    }
  });
}
