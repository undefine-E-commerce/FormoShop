import { Router } from "express";
import {
  crearTienda,
  obtenerTiendas,
  obtenerTienda,
  actualizarTienda,
  eliminarTienda,
} from "../controllers/tienda.controllers.js";

const router = Router();

router.post("/create-store", crearTienda);
router.get("/stores", obtenerTiendas);
router.get("/stores/:id", obtenerTienda);
router.put("/update-store/:id", actualizarTienda);
router.delete("/delete-store/:id", eliminarTienda);

export default router;
