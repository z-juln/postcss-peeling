const fs = require('fs')
const {
    regexp_varKey,
    regexp_colorValue,
    regexp_cssVarRow,
} = require('./regexp.js')

const cssVarParse = (css) => {
    let vars = {}

    const matchRegExp = new RegExp(regexp_cssVarRow, 'g')

    css.replace(matchRegExp, (match, s1, s2) => {
        // console.log('match: ', match, ' s1: ', s1, ' s2: ', s2)
        if (match) {
            vars[s1] = s2
        }
    })
    // console.log('vars: ', vars)
    return vars
}

const cssVarParseByPath = (path) => {
    const buffer = fs.readFileSync(path)
    const css = buffer.toString()
    // console.log('css: ', css)

    let vars = cssVarParse(css)
    // console.log('vars: ', vars)
    return vars
}

const cssVarParseByPaths = (paths) =>
    paths.reduce((res, curPath) => {
        return {
            ...res,
            ...cssVarParseByPath(curPath)
        }
    }, {})

module.exports = {
    cssVarParse,
    cssVarParseByPath,
    cssVarParseByPaths,
}
