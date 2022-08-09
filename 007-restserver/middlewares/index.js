const validateFields = require("./validateFields");
const validateJwt = require("./validarJwt");
const validateRol = require("./validateRole");
const validateFile = require("./validateFile");

module.exports = {
  ...validateFields,
  ...validateJwt,
  ...validateRol,
  ...validateFile,
};
