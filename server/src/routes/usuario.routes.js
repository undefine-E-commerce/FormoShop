import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuarios/usuario.controllers.js";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/usuarios/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/users/create-user", register, crearUsuario);
router.get("/users/", obtenerUsuarios);
router.get("/users/:id", obtenerUsuario);
router.put("/users/update-user/:id", actualizarUsuario);
router.delete("/users/delete-user/:id", eliminarUsuario);
router.post("/users/login", login);
router.post("/users/logout", logout);
router.get("/users/profile", authRequired, profile);

export default router;
