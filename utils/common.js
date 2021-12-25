const flipObj = (obj) => {
  const entries = Object.entries(obj);
  const newEntries = entries.map(([key, val]) => [val, key]);
  const flipedObj = Object.fromEntries(newEntries);
  return flipedObj;
};

const isMatch = (strOrReg, targetStr) => {
  if (typeof strOrReg === "string") {
    return !!targetStr.match(strOrReg)?.[0];
  }
  return strOrReg.test(targetStr);
};

module.exports = {
  flipObj,
  isMatch,
};
