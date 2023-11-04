import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";
import { Logger } from "../loaders/logger.js";

const sequelize = new Sequelize(
  process.env.DB_NAME|| "ecommerce",
  process.env.DB_USER|| "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_dialect  || "mysql",
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    Logger.info("✅ Base de datos conectada");
  } catch (error) {
    Logger.error("❌ Error al conectar con base de datos", error);
  }
};

export { sequelize, DataTypes };
