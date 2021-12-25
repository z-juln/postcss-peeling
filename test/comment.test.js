const postcss = require("postcss");
const peeling = require("..");

describe.only("use css comment", () => {
  const colorMap = {
    "--primary-color": "#000000",
    "--primary-bgColor": "#ffffff",
  };
  it("/* peeling-no-parse */", () => {
    const rules = `
        /* peeling-no-parse */
        div {
          color: #000000;
        }
      `;
    const covered = `
        div {
          color: #000000;
        }
      `;
    const options = {
      colorMap,
    };
    const processed = postcss(peeling(options)).process(rules).css;

    expect(processed).toBe(covered);
  });

  it.only("/* peeling-inline-no-parse */", () => {
    const rules = `
      div {
        color: #000000; /* peeling-inline-no-parse */
      }
    `;
    const covered = `
      div {
        color: #000000;
      }
    `;
    const options = {
      colorMap,
    };
    const processed = postcss(peeling(options)).process(rules).css;

    expect(processed).toBe(covered);
  });
});
