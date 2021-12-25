const postcss = require("postcss");
const peeling = require("..");

describe('option colorMap', () => {
  const rules = `
    body {
      color: #000000;
      background-color: #ffffff;
      border: 1px solid #ff0000;
    }
  `;
  const covered = `
    body {
      color: var(--primary-color);
      background-color: var(--primary-bgColor);
      border: 1px solid #ff0000;
    }
  `;
  it('colorMap = json of css-var', () => {
    const colorMap = {
      "--primary-color": "#000000",
      "--primary-bgColor": "#ffffff",
      "--primary-borderColor": "#ff0000"
    };
    var options = {
      colorMap,
    };
    var processed = postcss(peeling(options)).process(rules).css;

    expect(processed).toBe(covered);
  });
});

describe('option excludes', () => {
  const colorMap = {
    "--primary-color": "#000000",
    "--primary-bgColor": "#ffffff"
  };
  const rules = `
    body {
      color: #000000;
      background-color: #ffffff;
    }
  `;
  const covered = `
    body {
      color: var(--primary-color);
      background-color: var(--primary-bgColor);
    }
  `;

  it('the style should not be overwritten.', () => {
    const options = {
      colorMap,
      excludes: [/\/node_modules\//, /\/exclude\//]
    };
    const processed = postcss(peeling(options)).process(rules, {
      from: '/exclude/main.css'
    }).css;

    expect(processed).toBe(rules);
  });

  it('the style should be overwritten.', () => {
    var options = {
      colorMap,
      excludes: [/\/node_modules\//, /\/exclude\//]
    };
    var processed = postcss(peeling(options)).process(rules, {
      from: '/example/main.css'
    }).css;

    expect(processed).toBe(covered);
  });
});

describe('option includes', () => {
  const colorMap = {
    "--primary-color": "#000000",
    "--primary-bgColor": "#ffffff"
  };
  const rules = `
    body {
      color: #000000;
      background-color: #ffffff;
    }
  `;
  const covered = `
    body {
      color: var(--primary-color);
      background-color: var(--primary-bgColor);
    }
  `;

  it('the style should not be overwritten.', () => {
    const options = {
      colorMap,
      includes: [/\/flexible\//, /\/mobile\//]
    };
    const processed = postcss(peeling(options)).process(rules, {
      from: '/pc/main.css'
    }).css;

    expect(processed).toBe(rules);
  });

  it('the style should be overwritten.', () => {
    const options = {
      colorMap,
      includes: [/\/flexible\//, /\/mobile\//]
    };
    const processed = postcss(peeling(options)).process(rules, {
      from: '/flexible/main.css'
    }).css;

    expect(processed).toBe(covered);
  });
});

describe('option includes & excludes', () => {
  const colorMap = {
    "--primary-color": "#000000",
    "--primary-bgColor": "#ffffff"
  };
  const rules = `
    body {
      color: #000000;
      background-color: #ffffff;
    }
  `;
  const covered = `
    body {
      color: var(--primary-color);
      background-color: var(--primary-bgColor);
    }
  `;

  it('the style should not be overwritten.', () => {
    const options = {
      colorMap,
      includes: [/\/flexible\//, /\/mobile\//],
      excludes: [/\/not-transform\//, /pc/]
    };
    const processed = postcss(peeling(options)).process(rules, {
      from: '/flexible/not-transform/main.css'
    }).css;

    expect(processed).toBe(rules);
  });

  it('the style should be overwritten.', () => {
    const options = {
      colorMap,
      includes: [/\/flexible\//, /\/mobile\//],
      excludes: [/\/not-transform\//, /pc/]
    };
    const processed = postcss(peeling(options)).process(rules, {
      from: '/mobile/style/main.css'
    }).css;

    expect(processed).toBe(covered);
  });
});
