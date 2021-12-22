const { checkOpts, cssVarParse, deDuplicateOfCssVarMaps } = require('./utils/index.js')

const peeling = (opts = {}) => {
    checkOpts(opts)

    const { colorMap, excludes = [] } = opts
    let colorMapPaths
    if (Array.isArray(colorMap)) {
        colorMapPaths = colorMap
    } else {
        colorMapPaths = [colorMap]
    }
    // console.log('colorMapPaths: ', colorMapPaths)

    let variables = colorMapPaths.map(cssVarParse)
    // 去重
    variables = deDuplicateOfCssVarMaps(variables)
    // console.log('variables: ', variables)
    
    return {
        postcssPlugin: 'postcss-peeling',
        // Once (root, postcss) {
        //     // 此处root即为转换后的AST，此方法转换一次css将调用一次
        // },
        Declaration (decl, postcss) {
            // postcss遍历css样式时调用，在这里可以快速获得type为decl的节点

            const from = decl.source.input.file
            // console.log('from: ', from)
            const css = decl.source.input.css

            const requireParse = !css.includes('/* peeling-no-parse */')
                && !colorMapPaths.includes(from)
                && !excludes.includes(from)
            // console.log('has commont [peeling-no-parse]: ', css.includes('/* peeling-no-parse */'))
            // console.log('in colorMapPaths: ', colorMapPaths.includes(from))
            // console.log('in excludes: ', excludes.includes(from))
            // console.log('requireParse: ', requireParse)

            if (requireParse) {

                const targetItem = variables.find(item => item.value === decl.value)
                // console.log('target: ', targetItem)
                if (targetItem) {
                    decl.value = `var(${targetItem.key})`
                    // console.log('result: ', decl.value)
                }
            }
        },
        // Declaration: {
        //   color(decl, postcss) {
        //     // 可以进一步获得decl节点指定的属性值，这里是获得属性为color的值
        //   }
        // },
        // Comment (comment, postcss) {
        //     // 可以快速访问AST注释节点（type为comment）
        // },
        // AtRule(atRule, postcss) {
        //     // 可以快速访问css如@media，@import等@定义的节点（type为atRule）
        // }
    }
}
peeling.postcss = true

module.exports = peeling
