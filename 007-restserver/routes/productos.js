const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProductos,
  getProducto,
  addProducto,
  setProducto,
  deleteProducto,
} = require("../controllers/productos");
const {
  existProducto,
  existUsuarioPorId,
  existCategoria,
} = require("../helpers/db-validators");
const { validateFields, validateJwt, isAdminRol } = require("./../middlewares");

const router = Router();

// Get all products
router.get("/", getProductos);

// Get product
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existProducto),
    validateFields,
  ],
  getProducto
);

// Create product
router.post(
  "/",
  [
    validateJwt,
    isAdminRol,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("precio", "El precio es requerido").not().isEmpty(),
    check("precio", "El precio debe ser un número").isNumeric(),
    check("categoria", "La categoría es requerida").not().isEmpty(),
    check("categoria", "El ID de la categoría no es válido").isMongoId(),
    check("categoria").custom(existCategoria),
    validateFields,
  ],
  addProducto
);

// Update product
router.put(
  "/:id",
  [
    validateJwt,
    isAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existProducto),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("precio", "El precio es requerido").notEmpty(),
    check("precio", "El precio debe ser un número").isNumeric(),
    check("disponible", "La disponibilidad debe ser true o false").isBoolean(),
    validateFields,
  ],
  setProducto
);

// Delete product
router.delete(
  "/:id",
  [
    validateJwt,
    isAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existProducto),
    validateFields,
  ],
  deleteProducto
);

module.exports = router;
