import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";
import { Logger } from "../../loaders/logger.js";

// Se crea una instancia de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_dialect,
  }
);

// Function to connect to the database
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();

    Logger.info("Base de datos conectada");
  } catch (error) {
    Logger.error("Error al conectar con base de datos");
  }
};

export { sequelize, DataTypes };
