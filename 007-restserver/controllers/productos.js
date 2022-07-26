const { request, response, json } = require("express");
const { Producto, Categoria, Usuario } = require("./../models");

const getProductos = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;

  const response = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .skip(Number(offset))
      .limit(Number(limit))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  const [total, productos] = response;

  const stats = {
    mostrando: productos.length,
    total,
  };

  res.json({
    stats,
    productos,
  });
};

const getProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

const addProducto = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { precio, categoria, descripcion } = req.body;
  const id = req.usuarioAuth._id.toString();

  const existe = await Producto.findOne({ nombre });

  if (existe) {
    return res.status(400).json({
      message: `El producto: ${nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: id,
    precio,
    categoria,
    descripcion,
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(201).json(producto);
};

const setProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const { precio, descripcion, disponible } = req.body;
  const idUsuario = req.usuarioAuth._id.toString();

  const exist = await Producto.findOne({ nombre });

  if (exist && exist._id.toString() !== id) {
    return res.status(400).json({
      message: `El nombre: ${data.nombre} ya pertenece a otro producto, elige otro`,
    });
  }

  const data = {
    nombre,
    precio,
    descripcion,
    usuario: idUsuario,
    disponible,
  };

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

const deleteProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const idUsuario = req.usuarioAuth._id.toString();

  const producto = await Producto.findByIdAndUpdate(
    id,
    {
      estado: false,
      usuario: idUsuario,
      disponible: false,
    },
    { new: true }
  )
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

module.exports = {
  getProductos,
  getProducto,
  addProducto,
  setProducto,
  deleteProducto,
};
