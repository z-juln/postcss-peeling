const peeling = require("../index.js");
const path = require("path");

const resolve = (p) => path.join(__dirname, p);

module.exports = {
  plugins: [
    peeling({
      colorMap: peeling.cssVarParseByPaths([
        resolve("./src/common-theme.css"),
        resolve("./src/white-theme.css"),
      ]),
      includes: [
        /src\/.*?\.css/,
      ],
      excludes: [
        /src\/.*?-theme\.css/
      ],
    }),
    require("autoprefixer"),
    require("postcss-nested"),
  ],
};
