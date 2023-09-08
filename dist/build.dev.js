"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _globalConfig = require("./globalConfig.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var copyDirectory = function copyDirectory(srcDir, destDir) {
  // 判断目标目录是否存在，不存在则创建
  if (!_fs["default"].existsSync(destDir)) {
    _fs["default"].mkdirSync(destDir);
  }

  _fs["default"].readdirSync(srcDir).forEach(function (file) {
    var srcPath = _path["default"].join(srcDir, file);

    var destPath = _path["default"].join(destDir, file);

    if (_fs["default"].lstatSync(srcPath).isDirectory()) {
      // 递归复制子目录
      copyDirectory(srcPath, destPath);
    } else {
      // 复制文件
      _fs["default"].copyFileSync(srcPath, destPath);
    }
  });
}; // 删除目录及文件


var deleteDirectory = function deleteDirectory(dir) {
  if (_fs["default"].existsSync(dir)) {
    _fs["default"].readdirSync(dir).forEach(function (file) {
      var curPath = _path["default"].join(dir, file);

      if (_fs["default"].lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        deleteDirectory(curPath);
      } else {
        // 删除文件
        _fs["default"].unlinkSync(curPath);
      }
    }); // 删除空目录


    _fs["default"].rmdirSync(dir);
  }
}; // 源目录：content script临时生成目录


var contentOutDir = _path["default"].resolve(process.cwd(), _globalConfig.CRX_CONTENT_OUTDIR); // 源目录：background script临时生成目录


var backgroundOutDir = _path["default"].resolve(process.cwd(), _globalConfig.CRX_BACKGROUND_OUTDIR); // 目标目录：Chrome Extension 最终build目录


var outDir = _path["default"].resolve(process.cwd(), _globalConfig.CRX_OUTDIR); // 将复制源目录内的文件和目录全部复制到目标目录中


copyDirectory(contentOutDir, outDir);
copyDirectory(backgroundOutDir, outDir); // 删除源目录

deleteDirectory(contentOutDir);
deleteDirectory(backgroundOutDir);