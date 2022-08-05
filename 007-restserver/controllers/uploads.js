const { request, response } = require("express");
const { model } = require("mongoose");
const { uploadFile } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ message: "No hay archivos que subir" });
  }

  try {
    const file = await uploadFile(req.files, ["txt", "md"], "plaintext");

    res.json({
      file,
    });
  } catch (message) {
    return res.status(400).json({ message });
  }
};

const actualizarImagen = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await Usuario.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ message: `No existe un usuario con el id: ${id}` });
      }
      break;
    case "products":
      model = await Producto.findById(id);

      if (!model) {
        return res
          .status(400)
          .json({ message: `No existe un producto con el id: ${id}` });
      }
      break;
    default:
      return res.status(500).json({ message: "Collección no contemplada" });
  }

  const file = await uploadFile(req.files, ["jpg", "png", "gif"], collection);

  if (!file) {
    return res
      .status(500)
      .json({ message: "El archivo no se ha podido guardar" });
  }

  model.image = file;
  await model.save();

  res.json(model);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
