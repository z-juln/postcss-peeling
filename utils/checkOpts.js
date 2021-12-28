const fs = require("fs");
const { throwErr } = require("./throwErr");

const checkOpts = (opts) => {
  const { colorMap, excludes, includes } = opts;

  const isStrArrOrRegArr = (target) =>
    Array.isArray(target) && target.every(item => 
      typeof item === "string" 
      || item instanceof RegExp
    );

  const validParams_cludes = (cludes) =>
    (cludes === undefined || isStrArrOrRegArr(cludes));

  const validParams_colorMap = colorMap && colorMap.toString() === '[object Object]';
  const validParams_excludes = validParams_cludes(excludes);
  const validParams_includes = validParams_cludes(includes);
  const validParams =
    validParams_colorMap && validParams_excludes && validParams_includes;

  if (colorMap === undefined) {
    throwErr("参数colorMap不存在");
  }
  if (!validParams) {
    throwErr("参数格式不匹配(https://github.com/z-juln/postcss-peeling)");
  }
};

module.exports = checkOpts;
