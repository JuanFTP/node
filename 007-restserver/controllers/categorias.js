const { request, response } = require("express");
const { Categoria } = require("./../models");

const addCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const usuario = req.usuarioAuth;

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      message: `La categoría: ${nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: usuario._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
};

module.exports = {
  addCategoria,
};
