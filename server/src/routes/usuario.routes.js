import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuario.controllers.js";
// import { createUserSchema, updateUserSchema } from "./userValidation";

const router = Router();

router.post("/create-user", crearUsuario);
router.get("/users", obtenerUsuarios);
router.get("/users/:id", obtenerUsuario);
router.put("/update-user/:id", actualizarUsuario);
router.delete("/delete-user/:id", eliminarUsuario);

export default router;
