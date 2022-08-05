const { Usuario, Categoria, Producto } = require("../models");
const Role = require("./../models/role");

const esRoleValido = async (rol = "") => {
  const existRole = await Role.findOne({ name: rol });

  if (!existRole) {
    throw new Error(`El rol: ${rol} no es válido`);
  }
};

// Verificar si el correo existe
const existCorreo = async (correo = "") => {
  const existe = await Usuario.findOne({ correo });
  if (existe) {
    throw new Error(`El correo: ${correo} ya se encuentra registrado`);
  }
};

// Verifica si el usuario existe
const existUsuarioPorId = async (id = "") => {
  const existe = await Usuario.findById(id);

  if (!existe) {
    throw new Error(`No existe el usuario con id: ${id}`);
  }
};

// Verifica si la categoría existe
const existCategoria = async (id = "") => {
  const existe = await Categoria.findById(id);

  if (!existe) {
    throw new Error(`No existe una categoría con el id: ${id}`);
  }

  if (existe && !existe.estado) {
    throw new Error(`No existe una categoría con el id: ${id}`);
  }
};

// Verifica si un producto existe
const existProducto = async (id = "") => {
  const existe = await Producto.findById(id);

  if (!existe) {
    throw new Error(`No existe un producto con el id: ${id}`);
  }
};

// Validar colecciones permitidas
const collectionsAllowed = (collection = "", collections = []) => {
  if (!collections.includes(collection)) {
    throw new Error(
      `La colección: ${collection} no está permitida, colecciones permitidas: ${collections.join(
        ", "
      )}`
    );
  } else {
    return true;
  }
};

module.exports = {
  esRoleValido,
  existCorreo,
  existUsuarioPorId,
  existCategoria,
  existProducto,
  collectionsAllowed,
};
