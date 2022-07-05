const { Router } = require("express");
const { check } = require("express-validator");
const { createLogin } = require("./../controllers/auth");
const { validateFields } = require("./../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es requerido").isEmail(),
    check("password", "La contraseña es requerida").not().isEmpty(),
    validateFields,
  ],
  createLogin
);

module.exports = router;
