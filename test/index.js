const postcss = require('postcss')
const peelingPlugin = require('../index.js')
const path = require('path')

const resolve = (p) => path.join(__dirname, p)

postcss([
    peelingPlugin({
        colorMap: [
            resolve('../examples/src/common-theme.css'),
            resolve('../examples/src/white-theme.css'),
        ]
    }),
    require('autoprefixer'),
    require('postcss-nested'),
]).process(`
    .demo {
        font-size: 14px; /*this is a comment*/
        color: #ff0000;
    }
`).then(result => {
  console.log(result.css)
})
