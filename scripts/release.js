const chalk = require('chalk');
const path = require('path');
const spawn = require('cross-spawn');

const error = chalk.bold.red;
const info = chalk.bold.green;

// admin:devops@2019
const NEXUS_TOKEN = 'YWRtaW46ZGV2b3BzQDIwMTk=';
const NEXUS_REGISTRY = '//172.16.9.242:8081/repository/npm-local/'

info('start...');

const { name: packageName } = require(path.resolve(
  process.cwd(),
  './package.json'
));

const { command } = require(path.resolve(process.cwd(), './lerna.json'));

// token权限比auth高，为了防止token覆盖auth，每次都重置下配置
// 我也没办法，lerna留的坑，lerna应该没有兼容最新版npm-registry-fetch
spawn.sync('npm',['config','set',`${NEXUS_REGISTRY}:_authToken=`])
spawn.sync('npm',['config','set',`${NEXUS_REGISTRY}:_auth=${NEXUS_TOKEN}`])

const argvs = [
  'publish',
  '--legacy-auth',
  NEXUS_TOKEN,
  '--registry',
  `http:${NEXUS_REGISTRY}`,
];

process.env.npm_config_ci && process.env.npm_config_ci.length &&  argvs.push('--yes')

//符合semver语义的版本
const semantic = [
  'major',
  'minor',
  'patch',
  'premajor',
  'preminor',
  'prepatch',
  'prerelease'
];

// 自定义preid
/**
 * ["--preid" "beta"]
 */

// 稳定版发测试版
/**
 * ["--conventional-prerelease","--preid" "beta"]
 */

// 测试版发稳定版
/**
 * ["--conventional-graduate"]
 */

if (command.publish && command.publish.version) {
  if (
    typeof command.publish.version === 'string' &&
    semantic.includes(command.publish.version)
  ) {
    argvs.push(...['--bump', command.publish.version]);
  } else if (command.publish.version instanceof Array) {
    argvs.push(...command.publish.version);
  }
}

try {
  const ps = spawn(
    path.resolve(process.cwd(), 'node_modules/.bin/lerna'),
    argvs,
    {
      stdio: 'inherit',
      encoding: 'utf-8',
      cwd: process.cwd(),
      env: {
        FORCE_COLOR: true,
        npm_config_color: 'always',
        npm_config_progress: true,
        ...process.env
      }
    }
  );

  ps.on('error', () => {
    throw new Error(`Failed to install ${packageName}\n${ps.stderr}`);
  });

  ps.on('close', () => {
    error(`Installed ${packageName}`);
  });
} catch (error) {
  error(`Failed to install ${error}`);
  process.exit(1);
}
