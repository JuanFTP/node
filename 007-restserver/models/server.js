require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usuarios: "/api/usuarios",
    };

    // Conectar a la bd
    this.connectDatabase();

    // Middlewares
    this.middlewares();

    // Rutas de aplicación
    this.routes();
  }

  async connectDatabase() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriengo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
