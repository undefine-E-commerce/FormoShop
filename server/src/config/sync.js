import { sequelize } from "./db.js";
import { Logger } from "../loaders/logger.js";
import ProductoModel from "../models/producto.js";
import TiendaModel from "../models/tienda.js";
import CategoriaTienda from "../models/categoria_tiendas.js";
import CategoriaProducto from "../models/categoria_productos.js";
import UsuarioModel from "../models/usuario.js";
import RolModel from "../models/roles.js";

export const syncModels = async () => {
  try {
    // Relación de Tienda con CategoriaTienda (Muchos a Muchos) a través de la tabla intermedia "TiendaCategoria"
    TiendaModel.belongsToMany(CategoriaTienda, { through: "TiendaCategoria" });
    CategoriaTienda.belongsToMany(TiendaModel, { through: "TiendaCategoria" });

    // Relación de Producto con CategoriaProducto (Muchos a Muchos) a través de la tabla intermedia "ProductoCategoria"
    ProductoModel.belongsToMany(CategoriaProducto, {
      through: "ProductoCategoria",
    });
    CategoriaProducto.belongsToMany(ProductoModel, {
      through: "ProductoCategoria",
    });

    // Relación de Usuario con Tienda (Uno a Uno)
    UsuarioModel.hasOne(TiendaModel, { foreignKey: "dueño" });
    TiendaModel.belongsTo(UsuarioModel, { foreignKey: "dueño" });

    // Relación de Usuario con Rol (Uno a Uno)
    UsuarioModel.belongsTo(RolModel, { foreignKey: "rol" });
    RolModel.hasOne(UsuarioModel, { foreignKey: "rol" });

    Logger.info("✅ Todas las asociaciones entre modelos han sido definidas");

    await sequelize.sync({ alter: true }); // Set force: true to drop existing tables
    Logger.info("✅ Todos los modelos han sido sincronizados");
  } catch (error) {
    Logger.error("❌ Ha ocurrido un error durante la sincronización:", error);
  }
};
