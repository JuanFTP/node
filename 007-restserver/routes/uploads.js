const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo } = require("../controllers/uploads");
const { validateFields, validateJwt, isAdminRol } = require("./../middlewares");

const router = Router();

router.post("/", [validateJwt, isAdminRol, validateFields], cargarArchivo);

module.exports = router;
