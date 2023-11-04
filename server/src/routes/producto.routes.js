import { Router } from "express";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/producto.controllers.js";

const router = Router();
router.post("/products/create-product", crearProducto);
router.get("/products", obtenerProductos);
router.get("/products/:id", obtenerProducto);
router.put("/products/update-product/:id", actualizarProducto);
router.delete("/products/delete-product/:id", eliminarProducto);

export default router;
