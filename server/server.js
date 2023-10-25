import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import paymentRoutes from "./src/routes/payment.routes.js";
import storeRoutes from "./src/routes/store.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import { Logger } from "./loaders/logger.js";

import { connectToDatabase } from "./src/config/db.js";
import { syncModels } from "./src/config/sync.js";

const app = express();
const PORT = process.env.PORT || 666;
const URL = process.env.URL || "http://localhost:";

app.enable("trust proxy");
app.use(helmet());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(paymentRoutes);
app.use(storeRoutes);
app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.listen(PORT, async () => {
  try {
    connectToDatabase(Logger.info("Conectado a la base de datos"));
    syncModels(Logger.info("Sync models"));

    Logger.info("Servidor escuchando en:");
    Logger.http(`${URL}${PORT}`);
  } catch (error) {
    Logger.error("Error al conectar a la base de datos:", error);
  }
});
