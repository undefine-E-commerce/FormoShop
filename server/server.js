// Importa las dependencias y módulos necesarios
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import paymentRoutes from "./src/routes/pago.routes.js";
import storeRoutes from "./src/routes/tienda.routes.js";
import productRoutes from "./src/routes/producto.routes.js";
import userRoutes from "./src/routes/usuario.routes.js";
import helmet from "helmet";
import fileUpload from "express-fileupload";

import { Logger } from "./loaders/logger.js";

//error handler personalizado
import { handleError } from "./src/middlewares/handleError.js";

import { connectToDatabase } from "./src/config/db.js";
import { syncModels } from "./src/config/sync.js";

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto predeterminado y la URL
const PORT = process.env.PORT || 666;
const URL = process.env.URL || "http://localhost:";

// Habilita algunas configuraciones de seguridad y middleware
app.enable("trust proxy");
app.use(helmet());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Agrega las rutas para pagos, tiendas y productos
app.use(paymentRoutes);
app.use(userRoutes);
app.use(storeRoutes);
app.use(productRoutes);

// Define una ruta de inicio
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.use((err, req, res, next) => {
  // Registrar el error en la consola
  console.error(err.stack);

  if (err.statusCode) {
    // Si el error ya tiene un statusCode, usarlo
    return handleError(err, req, res, next);
  } else {
    // Si no tiene statusCode, asumir que es un error de servidor (código 500)
    const error = {
      statusCode: 500,
      message: err.message || "Error interno del servidor",
      details: err.details,
      stack: err.stack,
    };
    return handleError(error, req, res, next);
  }
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  const err = {
    statusCode: 404,
    message: "Ruta no encontrada",
  };

  handleError(err, req, res, next);
});
// Inicia el servidor y muestra información de inicio
app.listen(PORT, async () => {
  try {
    await connectToDatabase(Logger.info("Conectado a la base de datos"));
    await syncModels(Logger.info("Sync models"));

    Logger.info("Servidor escuchando en:");
    Logger.http(`${URL}${PORT}`);
  } catch (error) {
    Logger.error("Error al conectar a la base de datos:", error);
  }
});
