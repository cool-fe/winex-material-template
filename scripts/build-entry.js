const Components = require("../local/components.json");
const fs = require("fs");
const render = require("json-templater/string");
const uppercamelcase = require("uppercamelcase");
const path = require("path");
const endOfLine = require("os").EOL; //由于在不同的操作系统上换行符代表的ASCLL码不同，所以这里引用endOfLine
const chalk = require("chalk");

var OUTPUT_PATH = path.join(__dirname, "../local/index.js"); // 入口文件输出路径
var IMPORT_TEMPLATE =
  "import {{name}} from '../components/{{package}}/lib/index.js'"; // import导入template
var INSTALL_COMPONENT_TEMPLATE = "  {{name}}";
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}

const components = [
{{install}}
]

const install = function (Vue, opts = {}) {
  if (Vue.WIN_INSTALLED) return // 只install一次，不同版本问题
  components.forEach(component => {
    if (component.notVueObj) {
      return
    }
    Vue.component(component.name, component)
  })
  // api方式挂载
  // Vue.prototype.$demo = demo.popup;

  Object.defineProperty(Vue, 'WIN_INSTALLED', {
    configurable: false,
    value: true,
    enumerable: false,
    writable: false
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '{{version}}',
  install,
{{list}}
}
`;

// delete Components.font
var ComponentNames = Object.keys(Components);
var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);

  includeComponentTemplate.push(
    render(IMPORT_TEMPLATE, {
      name: componentName,
      package: name
    })
  );
  // 挂载到api上的方式不需要注册组件
  if ([""].indexOf(componentName) === -1) {
    installTemplate.push(
      render(INSTALL_COMPONENT_TEMPLATE, {
        name: componentName,
        component: name
      })
    );
  }
  listTemplate.push(`  ${componentName}`);
});
var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join("," + endOfLine),
  version: process.env.VERSION || require("../package.json").version,
  list: listTemplate.join("," + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log(chalk.bgGreen("[build entry] DONE"));
