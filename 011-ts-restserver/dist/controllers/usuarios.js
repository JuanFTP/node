"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.setUsuario = exports.createUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuarios_1 = __importDefault(require("../models/usuarios"));
// Obtener todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuarios_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarios_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            message: `No existe el usuario con id: ${id}`,
        });
    }
    else {
        res.json(usuario);
    }
});
exports.getUsuario = getUsuario;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuarios_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            return res
                .status(400)
                .json({ message: `Ya existe un usuario con el email: ${body.email}` });
        }
        else {
            const usuario = new usuarios_1.default(body);
            yield usuario.save();
            res.json(usuario);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Contacta a tu administrador de TI",
        });
    }
    res.json({
        message: "POST Usuario",
        body,
    });
});
exports.createUsuario = createUsuario;
const setUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuarios_1.default.findByPk(id);
        if (!usuario) {
            return res
                .status(404)
                .json({ message: `El usuario con id: ${id} no existe` });
        }
        else {
            if (body.email) {
                const existeEmail = yield usuarios_1.default.findOne({
                    where: {
                        email: body.email,
                    },
                });
                if (existeEmail) {
                    return res.status(400).json({
                        message: `Ya existe un usuario con el email: ${body.email}`,
                    });
                }
            }
            yield usuario.update(body);
            res.json(usuario);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Contacta a tu administrador de TI",
        });
    }
});
exports.setUsuario = setUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarios_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            message: `El usuario con id: ${id} no existe`,
        });
    }
    // Eliminación física
    // await usuario.destroy();
    // Eliminación lógica
    yield usuario.update({ estado: false });
    res.json({
        message: "Usuario eliminado existosamente",
        usuario,
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map