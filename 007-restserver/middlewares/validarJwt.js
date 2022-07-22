// Middleware personalizado
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("./../models");

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header("x-api-key");

  if (!token) {
    return res.status(401).json({
      message: "Token requerido",
    });
  } else {
    try {
      const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
      const usuario = await Usuario.findById(uid);

      // Validar si existe un usuario
      if (!usuario) {
        return res.status(401).json({
          message: "Token no válido [ELIMINADO]",
        });
      }

      // Validar si el uid está aún activo
      if (!usuario.estado) {
        return res.status(401).json({
          message: "Token no válido [DESACTIVADO]",
        });
      }

      // Todo correcto
      req.usuarioAuth = usuario;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Token no válido",
      });
    }
  }
};

module.exports = {
  validateJwt,
};
