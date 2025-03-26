
const validateQueryParams = (params, requiredParams) => {
  for (let param of requiredParams) {
    if (!params[param]) {
      throw new Error(`Missing required query parameter: ${param}`);
    }
  }
};

module.exports = {
  validateQueryParams
};
