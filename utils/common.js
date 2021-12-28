const flipObj = (obj) => {
  const entries = Object.entries(obj);
  const newEntries = entries.map(([key, val]) => [val, key]);
  const flipedObj = Object.fromEntries(newEntries);
  return flipedObj;
};

const isMatch = (strOrReg, targetStr) => {
  if (typeof strOrReg === "string") {
    const matchStr = targetStr.match(strOrReg);
    return !!(matchStr && matchStr[0]);
  }
  return strOrReg.test(targetStr);
};

module.exports = {
  flipObj,
  isMatch,
};
