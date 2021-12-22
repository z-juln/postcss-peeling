const fs = require('fs')

const regexp_varKey = /\-\-.+?/
const regexp_colorValue = /[[#[A-Za-z0-9]{3,7}|AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|Darkorange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|Feldspar|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed |Indigo  |Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|VioletRed|Wheat|White|WhiteSmoke|Yellow|YellowGreen]/i
const regexp_cssVarRow = /(\-\-.+?):\s*.*?([#[A-Za-z0-9]{3,7}|AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|Darkorange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|Feldspar|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed |Indigo  |Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|VioletRed|Wheat|White|WhiteSmoke|Yellow|YellowGreen).*?;/i

const cssVarParse = (path) => {
    const buffer = fs.readFileSync(path)
    const css = buffer.toString()
    // console.log('css: ', css)

    let vars = []
    const isRepeatKey = key => vars.some(item => item.key === key)
    const isRepeatValue = value => vars.some(item => item.value === value)

    const matchRegExp = new RegExp(regexp_cssVarRow, 'g')

    css.replace(matchRegExp, (match, s1, s2) => {
        // console.log('match: ', match, ' s1: ', s1, ' s2: ', s2)
        if (match) {
            if (isRepeatKey(s1)) return
            vars.push({
                key: s1,
                value: s2
            })
        }
    })
    // console.log('vars: ', vars)
    return vars
}

const deDuplicateOfCssVarMaps = (maps) => {
    // console.log('maps: ', maps)
    let bigMap = []
    maps.forEach(map => bigMap = bigMap.concat(map))
    // console.log('bigMap: ', bigMap)

    const isRepeatKey = (vars, key) => vars.some(item => item.key === key)

    let result = []
    bigMap.forEach(vars => {
        const { key, value } = vars
        if (isRepeatKey(result, key)) {
            result.find(item => item.key === key).value = value
        } else {
            result.push(vars)
        }
    })

    return result
}

const errorPrefix = '[Error from postcss-peeling]: '

const throwErr = (msg) => {
    console.log('\n' + errorPrefix + msg + '\n')
    process.exit()
}

const checkOpts = (opts) => {
    const { colorMap, excludes } = opts

    const validParams_colorMap = typeof colorMap === 'string'
        || (
            Array.isArray(colorMap)
            && colorMap.every(item => typeof item === 'string')
        )
    const validParams_excludes = Array.isArray(excludes)
        && excludes.every(item => typeof item === 'string')
    const validParams = validParams_colorMap
        && validParams_excludes
    const existsCssFile = Array.isArray(colorMap)
        ? colorMap.every(fs.existsSync)
        : fs.existsSync(colorMap)

    if (!colorMap) {
        throwErr('参数colorMap不存在')
    }
    if (!validParams) {
        throwErr('参数格式不匹配')
    }
    if (!existsCssFile) {
        throwErr('css文件不存在')
    }
}

module.exports = {
    cssVarParse,
    deDuplicateOfCssVarMaps,
    checkOpts,
}
