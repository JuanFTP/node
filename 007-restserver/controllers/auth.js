const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("./../models/usuario");

const { generateJWT } = require("./../helpers/jwt");
const { googleVerify } = require("./../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, image } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        image,
        rol: "USER_ROLE",
        password: ":P",
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        message: "Usuario no válido, contacta a tu agente de TI",
      });
    }

    // Generar JWT
    const token = await generateJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "El token no se pudo validar :X",
    });
  }
};

module.exports = {
  createLogin,
  googleSignIn,
};
