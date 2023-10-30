import { sequelize, DataTypes } from "../config/db.js";
import ProductoModel from "./producto.js";

const TiendaModel = sequelize.define(
  "Tiendas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tienda_categorias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueño: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // productos: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
  }
);

export default TiendaModel;
