const { Router } = require("express");
const { check } = require("express-validator");
const {
  esRoleValido,
  existCorreo,
  existUsuarioPorId,
} = require("./../helpers/db-validators");
const {
  getUsuarios,
  setUsuarios,
  updateUsuarios,
  createUsuarios,
  deleteUsuarios,
} = require("./../controllers/usuarios");
const { validateFields, validateJwt, hasRole } = require("./../middlewares");

const router = Router();

router.get("/:id?", getUsuarios);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId().custom(existUsuarioPorId),
    check("correo", "El correo ingresado no es válido").isEmail(),
    check(
      "password",
      "El password es requerido y de al menos 6 letras"
    ).isLength({ min: 6 }),
    check("rol").custom(esRoleValido),
    validateFields,
  ],
  setUsuarios
);

router.patch("/:id", updateUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("correo", "El correo ingresado no es válido")
      .isEmail()
      .custom(existCorreo),
    check(
      "password",
      "El password es requerido y de al menos 6 letras"
    ).isLength({ min: 6 }),
    check("rol").custom(esRoleValido),
    validateFields,
  ],
  createUsuarios
);

router.delete(
  "/:id",
  [
    validateJwt,
    //isAdminRol,
    hasRole("USER_ROLE", "SALES_ROLE"),
    check("id", "No es un id válido").isMongoId().custom(existUsuarioPorId),
    validateFields,
  ],
  deleteUsuarios
);

module.exports = router;
