// Importamos el Logger para registrar los errores y eventos
import { Logger } from "../../loaders/logger.js";

// Función que verifica si el objeto de respuesta (res) es válido
const esRespuestaValida = (res) => res && typeof res.status === "function";

// Middleware de manejo de errores
export const handleError = (error, req, res, siguiente) => {
  try {
    // Paso 1: Verificar la validez del objeto de respuesta
    if (!esRespuestaValida(res)) {
      // Paso 1.1: Manejar errores adicionales en la respuesta HTTP
      if (error && typeof error === "object" && error.message) {
        console.error("Error en el servidor:", error.message);
      } else {
        // Paso 1.2: Lanzar un error si el objeto de respuesta no es válido
        throw new Error(
          "El objeto de respuesta es inválido o no está presente."
        );
      }
    }

    // Paso 2: Determinar el código de estado HTTP (código de respuesta)
    const codigoEstado = error.codigoEstado || 500;

    // Paso 3: Construir una respuesta de error
    const respuestaError = {
      exito: false,
      error: {
        mensaje: error.mensaje || "Error interno del servidor",
      },
    };

    // Paso 4: Agregar detalles y traza del error si están disponibles
    if (error.detalles) {
      respuestaError.error.detalles = error.detalles;
    }
    if (error.pila) {
      respuestaError.error.pila = error.pila;
    }

    // Paso 5: Registrar el error utilizando el Logger con un nivel de severidad según el código de estado
    if (codigoEstado >= 500) {
      Logger.error(error.mensaje, error);
    } else {
      Logger.warn(error.mensaje, error);
    }

    // Paso 6: Enviar una respuesta JSON con el código de estado y la estructura de respuesta de error
    if (!res.headersSent) {
      res.status(codigoEstado).json(respuestaError);
    }
  } catch (errorCatch) {
    // Paso 7: Manejar errores adicionales durante el manejo de errores
    Logger.error("Error al manejar el error", errorCatch);

    // Paso 8: Enviar una respuesta de error en el servidor si es posible
    if (esRespuestaValida(res) && !res.headersSent) {
      res.status(500).json({ error: "Error en el servidor" });
    } else {
      // Paso 9: Enviar una respuesta HTTP simple en caso de error adicional
      console.error("Error en el servidor:", errorCatch.message);
    }
  }
};
