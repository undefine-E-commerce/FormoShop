import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/usuario.routes.js";
import storeRoutes from "./src/routes/tienda.routes.js";
import productRoutes from "./src/routes/producto.routes.js";
import paymentRoutes from "./src/routes/pago.routes.js";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import { Logger } from "./src/loaders/logger.js";

import { connectToDatabase } from "./src/config/db.js";
import { syncModels } from "./src/config/sync.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT || 666;
const URL = process.env.URL || "http://localhost:";

app.enable("trust proxy");
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/auth", authRoutes);
app.use("/api/pagos", paymentRoutes);
app.use("/api/", userRoutes);
app.use("/api/", storeRoutes);
app.use("/api/", productRoutes);

// Define una ruta de inicio
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!❤️‍🔥🥵");
});

app.use((req, res, next) => {
  const err = new Error(`❌ ${req.url} not found in this server`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Inicia el servidor y muestra información de inicio
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    await syncModels();
    Logger.info("🚀 Servidor escuchando en:");
    Logger.http(`${URL}${PORT}`);
  } catch (error) {
    Logger.error("❌ Error al conectar a la base de datos:", error);
  }
});
