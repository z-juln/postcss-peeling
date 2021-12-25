const peeling = require("..");

const resolveCss = (filename) =>
  require("path").join(__dirname, "src", filename);

describe("parse css-var", () => {
  it("api: peeling.cssVarParse", () => {
    const rules = `
        body {
          --primary-color: #000000;
          --primary-bgColor: #ffffff;
          --primary-borderColor: #ff0000;
        }
      `;
    const expected = {
      "--primary-color": "#000000",
      "--primary-bgColor": "#ffffff",
      "--primary-borderColor": "#ff0000",
    };
    const { cssVarParse } = peeling;
    const parsed = cssVarParse(rules);
    expect(parsed).toStrictEqual(expected);
  });

  it("api: peeling.cssVarParseByPath", () => {
    const cssPath = resolveCss("colorMap.css");
    const expected = {
      "--primary-color": "#000000",
      "--primary-bgColor": "#ffffff",
      "--primary-borderColor": "#ff0000",
    };
    const parsed = peeling.cssVarParseByPath(cssPath);
    expect(parsed).toStrictEqual(expected);
  });

  it("api: peeling.cssVarParseByPaths, the back covers the front", () => {
    const cssPath = resolveCss("colorMap.css");
    const css2Path = resolveCss("colorMap2.css");
    const expected = {
      "--primary-color": "#000000",
      "--primary-bgColor": "#ffffff",
      "--primary-borderColor": "#ff0000",
    };
    const parsed = peeling.cssVarParseByPaths([css2Path, cssPath]);
    expect(parsed).toStrictEqual(expected);
  });
});
