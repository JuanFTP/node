const { request, response } = require("express");

const isAdminRol = (req = request, res = response, next) => {
  if (!req.usuarioAuth) {
    return res.status(500).json({
      message: "No es posible validar el rol sin los datos del usuario",
    });
  }

  const { rol, nombre } = req.usuarioAuth;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: `El usuario: ${nombre} no tiene permisos para realizar esta acción`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  console.log(roles);
  return (req = request, res = response, next) => {
    if (!req.usuarioAuth) {
      return res.status(500).json({
        message: "No es posible validar el rol sin los datos del usuario",
      });
    }

    const { rol, nombre } = req.usuarioAuth;

    if (!roles.includes(rol)) {
      return res.status(401).json({
        message: `El usuario: ${nombre} no tiene permisos para realizar esta acción, se requiere cualquiera de los siguientes roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRol,
  hasRole,
};
