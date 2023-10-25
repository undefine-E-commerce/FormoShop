import { Router } from "express";
import {
  showAllStores,
  showStore,
  createStore,
  updateStore,
  deleteStore,
} from "../controllers/store.js";

const router = Router();

// Ruta para crear una tienda
router.post("/create-store", createStore);

// Ruta para obtener todas las tiendas
router.get("/stores", showAllStores);

// Ruta para obtener una tienda específica por su ID
router.get("/stores/:id", showStore);

// Ruta para actualizar una tienda
router.put("/update-store", updateStore);

// Ruta para eliminar una tienda por su ID
router.delete("/delete-store/:id", deleteStore);

export default router;
