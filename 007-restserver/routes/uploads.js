const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
} = require("../controllers/uploads");
const { collectionsAllowed } = require("../helpers");
const {
  validateFields,
  validateJwt,
  isAdminRol,
  validateFile,
} = require("./../middlewares");

const router = Router();

router.post(
  "/",
  [validateJwt, isAdminRol, validateFile, validateFields],
  cargarArchivo
);

router.put(
  "/:collection/:id",
  [
    validateJwt,
    validateFile,
    check("collection", "La colección es requerida").notEmpty(),
    check("collection", "Collección no válida").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    check("id", "El id no es válido").isMongoId(),
    validateFields,
  ],
  actualizarImagen
);

router.get(
  "/:collection/:id",
  [
    validateJwt,
    check("collection", "La colección es requerida").notEmpty(),
    check("collection", "Collección no válida").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    check("id", "El id no es válido").isMongoId(),
    validateFields,
  ],
  mostrarImagen
);

module.exports = router;
