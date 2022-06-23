const { request, response } = require("express");

const getUsuarios = (req = request, res = response) => {
  const {
    query: { a, b },
    params,
  } = req;
	
  res.json({
    message: "GET Controller",
    query: { a, b },
    params,
  });
};

const setUsuarios = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    id,
  });
};

const updateUsuarios = (req = request, res = response) => {
  res.json({
    message: "PATCH Controller",
  });
};

const createUsuarios = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    nombre,
    edad,
  });
};

const deleteUsuarios = (req = request, res = response) => {
  res.json({
    message: "DELETE Controller",
  });
};

module.exports = {
  getUsuarios,
  setUsuarios,
  updateUsuarios,
  createUsuarios,
  deleteUsuarios,
};
