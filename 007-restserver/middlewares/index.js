const validateFields = require("./validateFields");
const validateJwt = require("./validarJwt");
const validateRol = require("./validateRole");

module.exports = {
  ...validateFields,
  ...validateJwt,
  ...validateRol,
};
