const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  correo: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password requerido"],
  },
  image: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Métodos personalizados para el modelo, debe usar una función normal por que usa el this
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...data } = this.toObject();

  return { uid: _id, ...data };
};

module.exports = model("Usuario", UsuarioSchema);
