const { Categoria } = require("../models");
const Role = require("./../models/role");
const Usuario = require("./../models/usuario");

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
};

module.exports = {
  esRoleValido,
  existCorreo,
  existUsuarioPorId,
  existCategoria,
};
