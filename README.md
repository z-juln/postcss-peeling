# postcss-peeling
一款用于换肤的postcss插件，基于postcss8和css变量

## 目的
为了开发时不需要考虑css变量名，而是直接编写颜色值，再通过该插件将颜色转换成css变量名

## 安装
使用 yarn
```cmd
yarn add postcss-peeling
```
使用 npm
```cmd
npm i postcss-peeling
```

## 使用
```js
const resolve = path => require('path').join(__dirname, path)

module.exports = {
  plugins: [
    require('postcss-peeling')({
      /*
        colorMap参数: css变量声明所在的文件
          colorMap可以是文件绝对路径，也可以是存放文件绝对路径的数组
          当colorMap为数组时，后面的重复的css变量会覆盖前面的css变量
      */
      colorMap: [
        resolve('./src/common-theme.css'),
        resolve('./src/white-theme.css'),
      ],
      /*
        excludes参数: 不被该插件转换的文件列表
          除了excludes中的文件, 使用了 peeling-no-parse 注释的文件，colorMap中的文件，都不会被该插件转换
      */
      excludes: [
        resolve('./src/common-theme.css'),
        resolve('./src/white-theme.css'),
        resolve('./src/dark-theme.css'),
      ],
    }),
  ]
}
```

```css
/* 在文件内使用注释: peeling-no-parse. 可保证该文件内的颜色值不会被插件转换 */

/* peeling-no-parse */
p {
  color: red; /* 注意: red 与 #ff0000 都是色值，但是该插件暂不支持确定两者是等价的 */
  background-color: #000000;
}
```

## 注意
1. 该插件的部分功能需要css注释支撑，如果需要使用这些功能的话，就不应该把删除注释相关的插件放在该插件前面使用. 建议将该插件放在预编译插件后的第一位使用.
2. red 和 #ff0000 暂不支持被确认为等价，所以开发时最好使用统一规范，如颜色值统一用6位数的16进制，且css变量值也是如此.
