import { DataTypes } from "sequelize";
import db from "../database/connection";

const Usuario = db.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

export default Usuario;
