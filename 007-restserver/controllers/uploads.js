const path = require("path");
const fs = require("fs");

const { request, response } = require("express");
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

  // Limpiar imagenes previas del usuario
  try {
    if (model.image) {
      // Borrar la imagen del servidor
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.image
      );

      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error interno, purgado..." });
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

const mostrarImagen = async (req = request, res = response) => {
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

  // Limpiar imagenes previas del usuario
  let pathImage = "";
  
  try {
    if (model.image) {
      // Borrar la imagen del servidor
      pathImage = path.join(__dirname, "../uploads", collection, model.image);

      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error interno, purgado..." });
  }

  pathImage = path.join(__dirname, "../assets", collection + ".png");
  console.log(pathImage);

  res.sendFile(pathImage);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
};
