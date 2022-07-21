const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("./../middlewares");
const { createLogin, googleSignIn } = require("./../controllers/auth");

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

router.post(
  "/google-sign",
  [
    check("id_token", "El ID token es requerido").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
