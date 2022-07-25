const { Router } = require("express");
const { check } = require("express-validator");
const {
  addCategoria,
  getCategorias,
  getCategoria,
  setCategoria,
  deleteCategoria,
} = require("../controllers/categorias");
const { existCategoria } = require("../helpers/db-validators");
const { validateFields, validateJwt, isAdminRol } = require("./../middlewares");

const router = Router();

router.get("/", getCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existCategoria),
  ],
  validateFields,
  getCategoria
);

router.post(
  "/",
  [
    validateJwt,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    validateFields,
  ],
  addCategoria
);

router.put(
  "/:id",
  [
    validateJwt,
    check("id", "No es nu ID válido").isMongoId(),
    check("id").custom(existCategoria),
    check("nombre", "El nombre es requerido").notEmpty(),
    isAdminRol,
    validateFields,
  ],
  setCategoria
);

router.delete(
  "/:id",
  [
    validateJwt,
    isAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existCategoria),
    validateFields,
  ],
  deleteCategoria
);

module.exports = router;
