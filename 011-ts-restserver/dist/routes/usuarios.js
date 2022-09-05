"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get("/", usuarios_1.getUsuarios);
router.get("/:id", usuarios_1.getUsuario);
router.post("/", usuarios_1.createUsuario);
router.put("/:id", usuarios_1.setUsuario);
router.delete("/:id", usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map