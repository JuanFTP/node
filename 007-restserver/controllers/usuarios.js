const { request, response } = require("express");
const Usuario = require("./../models/usuario");
const bcryptjs = require("bcryptjs");

// GET
const getUsuarios = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;

  const response = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(offset)).limit(Number(limit)),
  ]);

  const [total, usuarios] = response;

  const stats = {
    mostrando: usuarios.length,
    total,
  };

  res.json({
    stats,
    usuarios,
  });
};

// PUT
const setUsuarios = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...data } = req.body;

  if (password) {
    // Actualizar el password
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, data);

  res.json(usuario);
};

// PATCH
const updateUsuarios = (req = request, res = response) => {
  res.json({
    message: "PATCH Controller",
  });
};

// POST
const createUsuarios = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en la BD
  await usuario.save();

  res.json(usuario);
};

// DELETE
const deleteUsuarios = async (req = request, res = response) => {
  const { id } = req.params;
  const { usuarioAuth } = req;

  // Borrado lógico
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  getUsuarios,
  setUsuarios,
  updateUsuarios,
  createUsuarios,
  deleteUsuarios,
};
