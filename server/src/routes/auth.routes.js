import { Router } from "express";

const router = Router();

// Ruta para autenticar al usuario
router.post("/autenticar");

// Ruta protegida que requiere autenticación
router.get("/recurso-protegido", validarAutenticacion, (req, res) => {
  // Lógica para acceder al recurso protegido
  res.status(200).json({ mensaje: "¡Acceso permitido al recurso protegido!" });
});

export default router;
