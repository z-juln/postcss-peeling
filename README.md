# postcss-peeling

> 由于该插件局限性较大，已停止维护

一款用于换肤的postcss插件

基于: postcss8, css变量

当前版本: 2.0.0

[v1文档链接](./docs/v1-README.md)

[v1迁移指南](./docs/v1-to-v2.md)

[toc]

## 目的
为了开发时不需要考虑css变量名，而是直接编写颜色值，再通过该插件将颜色转换成css变量名

其他适用场景: 原来不需要换肤且开发时没用css变量的项目，如今需要实现换肤，就能用这个插件大大减少开发成本

## 安装
使用 yarn
```cmd
yarn add postcss-peeling
```
使用 npm
```cmd
npm i postcss-peeling
```

## 全局安装
> 使用命令建议全局安装
使用 yarn
```cmd
yarn global add postcss-peeling
```
使用 npm
```cmd
npm i -g postcss-peeling
```

## 插件使用
```js
const peeling = require("postcss-peeling");

const resolve = path => require('path').join(__dirname, path);

const colorMap = peeling.cssVarParseByPaths([
  resolve("./src/common-theme.css"),
  resolve("./src/white-theme.css"),
]);
/* 结果:
{
  "--primary-color": "#000000",
  "--primary-bgColor": "#ffffff",
  "--primary-borderColor": "#ff0000",
};
*/

module.exports = {
  plugins: [
    require('postcss-peeling')({
      colorMap,
      includes: [
        /src\/.*?\.css/,
      ],
      excludes: [
        /src\/.*?-theme\.css/,
      ],
    }),
  ]
}
```

/src/index.css
```css
/* input start */
h1 {
  color: #000000;
}
/* input end */

/* output start */
h1 {
  color: var(--primary-color);
}
/* output end */
```

```css
/* 在文件内使用注释: peeling-no-parse. 可保证该文件内的颜色值不会被插件转换 */

/* input start */
/* peeling-no-parse */
p {
  color: red;
  background-color: #000000;
}
/* input end */

/* output start */
p {
  color: red;
  background-color: #000000;
}
/* output end */
```

```css
/* 行尾使用 peeling-inline-no-parse. 可保证当前行的颜色值不会被插件转换 */

/* input start */
p {
  color: #000000;
  background-color: #ffffff; /* peeling-inline-no-parse */
}
/* input end */

/* output start */
p {
  color: var(--primary-color);
  background-color: #ffffff;
}
/* output end */
```

## 注意
1. 该插件的部分功能需要css注释支撑，如果需要使用这些功能的话，就不应该把删除注释相关的插件放在该插件前面使用. 建议将该插件放在预编译插件后的第一位使用.
2. red 和 #ff0000 暂不支持被确认为等价，所以开发时最好使用统一规范，如颜色值统一用6位数的16进制，且css变量值也是如此.
3. `cssVarParsePaths` 对应的文件发生修改时，devServer如需重启则记得重启
4. 经过测试, `cssVarParsePaths`等api、文件注释同样适用于less和scss

## 案例
[examples目录下](https://github.com/z-juln/postcss-peeling/tree/master/examples)

## 命令使用
开发中...
