# v1迁移指南

## 新增:
1. 新增一个插件参数: includes
2. 新增三个api，分别是 `cssVarParse`, `cssVarParseByPath`, `cssVarParseByPaths`。`cssVarParse` 将css字符串转换为 `colorMap`;`cssVarParseByPath`和`cssVarParseByPaths` 文件路径/文件路径的数组 => `colorMap`
3. 新增一个css功能注释: `/* peeling-inline-no-parse */`, 用于忽略某一行css的转换
4. 新增一个命令: `peeling parse --colorMap=src/**/*-theme.css --includes=src --excludes=node_modules`, 用于文件的直接替换

## 修改:
colorMap不再支持文件路径，而是json, colorMap案例如下
```json
{
    "--primary-color": "#000000",
    "--primary-bgColor": "#ffffff",
    "--primary-borderColor": "#ff0000",
}
```