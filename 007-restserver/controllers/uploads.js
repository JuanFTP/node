const { request, response } = require("express");
const { uploadFile } = require("../helpers");

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

module.exports = {
  cargarArchivo,
};
