import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Logger } from "../loaders/logger.js";
import Usuario from "../models/usuario.js";
import { sendUnauthorizedError } from "../middlewares/handleError.js";

// Controlador para autenticar al usuario
const autenticarUsuario = async (req, res) => {
  // Realizar las validaciones
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      error: "400",
      mensaje: "Datos de autenticación inválidos",
      errores: errores.array(),
    });
  }

  const { nick_name, contrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nick_name } });

    if (!usuario) {
      return sendUnauthorizedError(res, "Credenciales inválidas");
    }

    const esContraseniaValida = await usuario.compare(contrasenia);

    if (!esContraseniaValida) {
      return sendUnauthorizedError(res, "Credenciales inválidas");
    }

    const token = jwt.sign({ userId: usuario.id }, process.env.SECRET_KEY);
    return res.status(200).json({ token });
  } catch (error) {
    Logger.error("Error al autenticar al usuario", { error });
    return res
      .status(500)
      .json({ error: "500", mensaje: "Error en el servidor" });
  }
};

export default autenticarUsuario;
