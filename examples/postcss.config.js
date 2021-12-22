const peeling = require('../index.js')
const path = require('path')

const resolve = (p) => path.join(__dirname, p)

module.exports = {
    plugins: [
        peeling({
            colorMap: [
                resolve('./src/common-theme.css'),
                resolve('./src/white-theme.css'),
            ],
            excludes: [
                resolve('./src/common-theme.css'),
                resolve('./src/white-theme.css'),
                resolve('./src/dark-theme.css'),
            ],
        }),
        require('autoprefixer'),
        require('postcss-nested'),
    ]
}
