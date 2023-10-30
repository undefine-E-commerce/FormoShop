import { validationResult } from "express-validator";

// Middleware de validación centralizado
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Datos de solicitud inválidos",
      detalles: errors.array(),
    });
  }
  next();
};

export { validate };
