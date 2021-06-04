const Minio = require("minio");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const materialInfo = require("../build/materials.json");

const minioClient = new Minio.Client({
  endPoint: "172.16.6.51",
  port: 9000,
  useSSL: false,
  accessKey: "www.winning.com.cn",
  secretKey: "www.winning.com.cn"
});
if (!materialInfo.key) {
  console.log(chalk.red("package.json 中materialConfig缺少key"));
  console.log(
    chalk.red(
      "key可以为common、finance、clinical、execution、person、encouter、record、knowledge、material"
    )
  );
  process.exit(-1);
}
const filepath = `materials/${materialInfo.key}-materials.json`;
const file = path.resolve(__dirname, "./../build/materials.json");
const metaData = {
  "Content-Type": "application/octet-stream",
  "X-Amz-Meta-Testing": 1234,
  example: 5678
};
upload("winex", filepath, file);

// upload minio oss
function upload(bucket, filepath, file) {
  minioClient.fPutObject(bucket, filepath, file, metaData, function(err, etag) {
    if (!err) {
      console.log(chalk.green("上传成功"));
    } else {
      console.log(err); // err should be null
    }
  });
}
