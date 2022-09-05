import express, { Application } from "express";
import userRoutes from "./../routes/usuarios";
import cors from "cors";
import db from "../database/connection";

class Server {
  private app: Application;
  private port: string;
  private paths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8081";

    this.dbConnection();

    this.middleware();

    // Definir rutas
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online!");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middleware() {
    // CORS
    this.app.use(cors());

    // Lectural de body
    this.app.use(express.json());

    // Carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    // Usa el path y atiendelo con esa clasificación
    this.app.use(this.paths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

export default Server;
