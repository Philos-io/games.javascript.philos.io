var typescript = require('typescript');

module.exports = {
  process: function(src, filePath) {
    if (filePath.match(/\.ts$/) && !filePath.match(/\.d\.ts$/)) {
      return typescript.transpile(src, {
        jsx: typescript.JsxEmit.React,
        module: typescript.ModuleKind.CommonJS
      });
    }
    return src;
  }
};