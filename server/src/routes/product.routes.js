import { Router } from "express";
import {
  showAllProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js"; // Usar el controlador de productos

const router = Router();

// Ruta para crear un producto
router.post("/create-product", createProduct);

// Ruta para obtener todos los productos
router.get("/products", showAllProducts);

// Ruta para obtener un producto específico por su ID
router.get("/products/:id", showProduct);

// Ruta para actualizar un producto
router.put("/update-product", updateProduct);

// Ruta para eliminar un producto por su ID
router.delete("/delete-product/:id", deleteProduct);

export default router;
