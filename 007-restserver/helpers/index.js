const dbValidators = require("./db-validators");
const jwt = require("./jwt");
const googleVerify = require("./google-verify");
const uploadFile = require("./uploadFile");

module.exports = {
  ...dbValidators,
  ...jwt,
  ...googleVerify,
  ...uploadFile,
};
