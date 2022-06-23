const { Router } = require("express");
const {
  getUsuarios,
  setUsuarios,
  updateUsuarios,
  createUsuarios,
  deleteUsuarios,
} = require("./../controllers/usuarios");

const router = Router();

router.get("/:id?", getUsuarios);

router.put("/:id", setUsuarios);

router.patch("/:id", updateUsuarios);

router.post("/", createUsuarios);

router.delete("/:id", deleteUsuarios);

module.exports = router;
