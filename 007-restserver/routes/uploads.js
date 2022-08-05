const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { existUsuarioPorId, collectionsAllowed } = require("../helpers");
const { validateFields, validateJwt, isAdminRol } = require("./../middlewares");

const router = Router();

router.post("/", [validateJwt, isAdminRol, validateFields], cargarArchivo);

router.put(
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
  actualizarImagen
);

module.exports = router;
