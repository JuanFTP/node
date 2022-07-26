const { request, response } = require("express");
const { Categoria } = require("./../models");

// Obtener Categorías - Paginado - Total - Populate
const getCategorias = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;

  const response = await Promise.all([
    Categoria.countDocuments({ estado: true }),
    Categoria.find({ estado: true })
      .skip(Number(offset))
      .limit(Number(limit))
      .populate("usuario", "nombre"),
  ]);

  const [total, categorias] = response;

  const stats = {
    mostrando: categorias.length,
    total,
  };

  res.json({
    stats,
    categorias,
  });
};

// Obtener categoría - Populate
const getCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

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

// Actualizar categoría - Nombre
const setCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuarioAuth, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuarioAuth._id;

  const exist = await Categoria.findOne({ nombre: data.nombre });

  if (exist && exist._id.toString() !== id) {
    return res.status(400).json({
      message: `El nombre: ${data.nombre} ya pertenece a otra categoría, elige otro`,
    });
  }

  const categoria = await Categoria.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("usuario", "nombre");

  res.json(categoria);
};

// Borrar categoría - Cambiar estado a false
const deleteCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  ).populate("usuario", "nombre");

  res.json(categoria);
};

module.exports = {
  getCategorias,
  getCategoria,
  addCategoria,
  setCategoria,
  deleteCategoria,
};
