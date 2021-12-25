const peeling = require('../index')
const formatErrMsg =
  "参数格式不匹配";

describe("check options colorMap", () => {
  it("when not exist this at the time, throw error: 参数colorMap不存在", () => {
    const run = () => peeling({});
    expect(run).toThrow("参数colorMap不存在");
  });
  it("when this is not json at the time, throw error: 参数格式不匹配", () => {
    const run = () =>
      peeling({
        colorMap: null,
      });
    expect(run).toThrow(formatErrMsg);
  });
});

describe("check options includes", () => {
  it("when this is undefined at the time, not throw error", () => {
    const run = () =>
      peeling({
        colorMap: {},
      });
    expect(run).not.toThrow(formatErrMsg);
  });
  it("when this is array of path at the time, not throw error", () => {
    const run = () =>
      peeling({
        colorMap: {},
        includes: [
          "src"
        ],
      });
    expect(run).not.toThrow(formatErrMsg);
  });
  it("when this is not undefined or array of path at the time, throw error: 参数格式不匹配", () => {
    const run = () =>
      peeling({
        colorMap: {},
        includes: null,
      });
    expect(run).toThrow(formatErrMsg);
  });
});

describe("check options excludes", () => {
  it("when this is undefined at the time, not throw error", () => {
    const run = () =>
      peeling({
        colorMap: {},
      });
    expect(run).not.toThrow(formatErrMsg);
  });
  it("when this is array of path at the time, not throw error", () => {
    const run = () =>
      peeling({
        colorMap: {},
        excludes: [
          "src"
        ],
      });
    expect(run).not.toThrow(formatErrMsg);
  });
  it("when this is not undefined or array of path at the time, throw error: 参数格式不匹配", () => {
    const run = () =>
      peeling({
        colorMap: {},
        excludes: null,
      });
    expect(run).toThrow(formatErrMsg);
  });
});
