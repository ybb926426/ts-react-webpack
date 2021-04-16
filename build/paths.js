// 避免路径零乱，单独创建一个路径调用的配置文件
const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('./utils/getPublicUrlOrPath');

// 获取当前工作目录
const appDirectory = fs.realpathSync(process.cwd());
// 从相对路径中解析绝对路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

// 默认的模块扩展名
const moduleFileExtensions = ["js", "jsx", "ts", "tsx", "json"];
// 解析模块路径
const resolveModule = (resolveFn, filePath) => {
  // 查看文件存不存在
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.js`); // 如果没有默认就是js
};
module.exports = {
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appPath: resolveApp('.'),
  appPublic: resolveApp('public'),
  appBuildDist: resolveApp('dist'), // 打包路径
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  moduleFileExtensions,
  publicUrlOrPath
}
