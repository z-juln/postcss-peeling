const checkOpts = require("./utils/checkOpts");
const {
  cssVarParse,
  cssVarParseByPath,
  cssVarParseByPaths,
} = require("./utils/cssVarParse");
const { flipObj, isMatch } = require("./utils/common");

const peeling = (opts = {}) => {
  checkOpts(opts);

  const {
    colorMap: colorMapOpt,
    excludes: excludesOpt = [],
    includes: includesOpt,
  } = opts;
  // console.log('opts: ', opts);

  const colorMap = flipObj(colorMapOpt);
  // console.log('colorMap: ', colorMap);

  return {
    postcssPlugin: "postcss-peeling",
    // Once (root, postcss) {
    //     // 此处root即为转换后的AST，此方法转换一次css将调用一次
    // },
    Declaration(decl, postcss) {
      // postcss遍历css样式时调用，在这里可以快速获得type为decl的节点
      // console.log('decl: ', `${decl.props}: ${decl.value}`);

      const from = decl.source.input.file ?? ""; // 测试环境input.file可能是undefined
      const css = decl.source.input.css;
      // console.log('from: ', from);

      const ignoreSimpleNode = node => {
        const next = node.next();
        return next &&
          next.type === "comment" &&
          next.text === "peeling-inline-no-parse";
      }

      const requireParse =
        // 文件级别
        !css.includes("/* peeling-no-parse */") &&
        excludesOpt.every((rule) => !isMatch(rule, from)) &&
        (includesOpt === undefined ||
          includesOpt.some((rule) => isMatch(rule, from))) &&
        // 单行级别
        !ignoreSimpleNode(decl);
      // console.log('has comment [peeling-no-parse]: ', css.includes('/* peeling-no-parse */'));
      // console.log('in excludes: ', excludesOpt.includes(from));
      // console.log('has includes: ', includesOpt !== undefined);
      // includesOpt && console.log('in includes: ', includesOpt.includes(from));
      // console.log('ignore simple node: ', ignoreSimpleNode(decl));
      // console.log('requireParse: ', requireParse);

      if (requireParse) {
        const cssVar = colorMap[decl.value];
        if (cssVar) {
          decl.value = `var(${cssVar})`;
        }
      }
    },
    CommentExit(comment, postcss) {
      // 可以快速访问AST注释节点（type为comment）
      // console.log('comment-exit: ', comment.text);
      if (comment.text.startsWith("peeling-")) {
        comment.remove();
      }
    },
    // RootExit(root, postcss) {
    //   console.log('root-exit: ', root);
    // },
    // Declaration: {
    //   color(decl, postcss) {
    //     // 可以进一步获得decl节点指定的属性值，这里是获得属性为color的值
    //     console.log('decl: ', `color: ${decl.value}`)
    //   }
    // },
    // AtRule(atRule, postcss) {
    //   // 可以快速访问css如@media，@import等@定义的节点（type为atRule）
    //   // console.log('atRule: ', `@${atRule.name} ${atRule.params} {}`);
    // },
    // Rule(rule, postcss) {
    //   // console.log('rule: ', rule.selector, rule.selectors);
    // },
  };
};
peeling.postcss = true;

module.exports = peeling;
module.exports.cssVarParse = cssVarParse;
module.exports.cssVarParseByPath = cssVarParseByPath;
module.exports.cssVarParseByPaths = cssVarParseByPaths;
