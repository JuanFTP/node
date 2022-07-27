const { request, response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const colecciones = ["usuarios", "productos", "categorias"];

const buscarUsuarios = async (termino = "", res = response) => {
  const isId = ObjectId.isValid(termino);

  if (isId) {
    const usuario = await Usuario.findById(termino);

    return res.json({ results: usuario ? [usuario] : [] });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $and: [
      { estado: true },
      {
        $or: [{ nombre: regex }, { correo: regex }],
      },
    ],
  });

  res.json({ results: usuarios });
};

const buscarCategorias = async (termino = "", res = response) => {
  const isId = ObjectId.isValid(termino);

  if (isId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "nombre"
    );

    return res.json({ results: categoria ? [categoria] : [] });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    $and: [{ estado: true }, { nombre: regex }],
  }).populate("usuario", "nombre");

  res.json({ results: categorias });
};

const buscarProductos = async (termino = "", res = response) => {
  const isId = ObjectId.isValid(termino);

  if (isId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");

    return res.json({ results: producto ? [producto] : [] });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $and: [{ estado: true }, { nombre: regex }],
  })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({ results: productos });
};

const buscar = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!colecciones.includes(coleccion)) {
    return res.status(400).json({
      message: `La colección: ${coleccion} no existe, las permitidas son: ${colecciones.join(
        ", "
      )}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    default:
      return res.status(500).json({ message: "Colección no contemplada" });
  }
};

module.exports = {
  buscar,
};
