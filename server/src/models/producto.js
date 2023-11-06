import { sequelize, DataTypes } from "../config/db.js";
import TiendaModel from "./tienda.js";

const ProductoModel = sequelize.define(
  "Productos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producto_categorias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagen_url: {
      type: DataTypes.STRING, // Almacena la URL de la imagen del producto
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
    // Relaciona cada producto con una tienda
    tiendaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TiendaModel, // Asocia el modelo de Tienda
        key: "id", // Clave primaria de la tienda
      },
    },
  },
  {
    timestamps: true,
  }
);

export default ProductoModel;
