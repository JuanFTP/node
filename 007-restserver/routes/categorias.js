const { Router } = require("express");
const { check } = require("express-validator");
const { addCategoria } = require("../controllers/categorias");
const { validateFields, validateJwt } = require("./../middlewares");

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "GET obtener todas las categorías" });
});

router.get("/:id", (req, res) => {
  res.json({
    message: "GET obtener una categoría",
  });
});

// [RESTRICTED] - ANY_ROLE - token valid
router.post(
  "/",
  [
    validateJwt,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    validateFields,
  ],
  addCategoria
);

// [RESTRICTED] - ANY_ROLE - token valid
router.put("/:id", (req, res) => {
  res.json({ message: "PUT actualizar una categoría" });
});

// [RESTRICTED] - ADMIN_ROLE
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE eliminar categoría" });
});

module.exports = router;
