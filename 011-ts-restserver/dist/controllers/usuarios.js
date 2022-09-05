"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.setUsuario = exports.createUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const getUsuarios = (req, res) => {
    res.json({
        message: "GET Usuarios",
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        message: "GET Usuario",
        id,
    });
};
exports.getUsuario = getUsuario;
const createUsuario = (req, res) => {
    const { body } = req;
    res.json({
        message: "POST Usuario",
        body,
    });
};
exports.createUsuario = createUsuario;
const setUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        message: "PUT Usuario",
        id,
        body,
    });
};
exports.setUsuario = setUsuario;
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        message: "DELETE Usuario",
        id,
    });
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map