const errorPrefix = "[Error from postcss-peeling]: ";

const throwErr = (msg) => {
  throw new Error(errorPrefix + msg + "\n");
};

module.exports = {
  throwErr,
  errorPrefix,
};
