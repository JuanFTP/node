const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const comprobarJWT = async (token) => {
  try {
    if (!token) {
      return null;
    }

    // Validar token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return null;
    }

    if (!usuario.estado) {
      return null;
    }

    return usuario;
  } catch (err) {
    return null;
  }
};

module.exports = {
  generarJWT,
  comprobarJWT,
};
