const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, supportExtensions = [], folder = "") => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const components = archivo.name.split(".");
    const extension = components[components.length - 1];

    if (!supportExtensions.includes(extension)) {
      return reject(
        `Tipo de archivo no permitido: ${extension}, por favor utilice alguno de los siguientes: ${supportExtensions.join(
          ", "
        )}`
      );
    }

    const uniqueName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, "../uploads/", folder, uniqueName);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(uniqueName);
    });
  });
};

module.exports = {
  uploadFile,
};
