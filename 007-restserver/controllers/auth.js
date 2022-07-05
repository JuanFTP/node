const { response } = require("express");
const Usuario = require("./../models/usuario");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createLogin = async (req, res = response) => {
  const {
    body: { correo, password },
  } = req;

  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (usuario) {
      // Verificar si el usuario está activo aún
      if (!usuario.estado) {
        return res.status(400).json({
          message: "El usuario no se encuentra registrado",
        });
      } else {
        // Verificar si la contraseña es correcta
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
          return res.status(400).json({
            message: "La contraseña no es correcta",
          });
        } else {
          // Generar el JWT
          const token = await generateJWT(usuario.id);

          res.json({
            usuario,
            token,
          });
        }
      }
    } else {
      return res.status(400).json({
        message: "El usuario / password no es correcto",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Algo salió mal, por favor contacta a tu agente de TI",
    });
  }
};

module.exports = {
  createLogin,
};
