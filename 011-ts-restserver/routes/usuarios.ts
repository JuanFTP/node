import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  setUsuario,
} from "../controllers/usuarios";

const router = Router();

router.get("/", getUsuarios);

router.get("/:id", getUsuario);

router.post("/", createUsuario);

router.put("/:id", setUsuario);

router.delete("/:id", deleteUsuario);

export default router;
