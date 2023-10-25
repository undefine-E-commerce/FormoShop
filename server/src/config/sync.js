import "dotenv/config";
import { sequelize } from "./db.js";
import { Logger } from "../../loaders/logger.js";
import ProductoModel from "../models/producto.js";
import TiendaModel from "../models/tienda.js";
import UsuarioModel from "../models/usuario.js";

export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Set force: true to drop existing tables
    Logger.info("Todos los modelos han sido sincronizados");
  } catch (error) {
    Logger.error("Ha ocurrido un error durante la sincronización", error);
  }
};
