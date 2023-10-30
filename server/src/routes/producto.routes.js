import { Router } from "express";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/producto.controllers.js";

const router = Router();
router.post("/create-product", crearProducto);
router.get("/products", obtenerProductos);
router.get("/products/:id", obtenerProducto);
router.put("/update-product/:id", actualizarProducto);
router.delete("/delete-product/:id", eliminarProducto);

export default router;
