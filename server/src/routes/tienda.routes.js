import { Router } from "express";
import {
  crearTienda,
  obtenerTiendas,
  obtenerTienda,
  actualizarTienda,
  eliminarTienda,
} from "../controllers/tienda.controllers.js";

const router = Router();

router.post("/stores/create-store", crearTienda);
router.get("/stores", obtenerTiendas);
router.get("/stores/:id", obtenerTienda);
router.put("/stores/update-store/:id", actualizarTienda);
router.delete("/stores/delete-store/:id", eliminarTienda);

export default router;
