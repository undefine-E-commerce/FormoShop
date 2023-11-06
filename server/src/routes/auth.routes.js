import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/usuarios/auth.controllers.js";
import { crearUsuario } from "../controllers/usuarios/usuario.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register, crearUsuario);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profie", authRequired, profile);
export default router;
