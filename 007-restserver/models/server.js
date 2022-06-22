require("dotenv").config();
const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Rutas de aplicación
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        message: "GET",
      });
    });

    this.app.put("/api", (req, res) => {
      res.json({
        message: "PUT",
      });
    });

    this.app.patch("/api", (req, res) => {
      res.json({
        message: "PATCH",
      });
    });

    this.app.post("/api", (req, res) => {
      res.json({
        message: "POST",
      });
    });

    this.app.delete("/api", (req, res) => {
      res.json({
        message: "DELETE",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriengo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
