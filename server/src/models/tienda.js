import { sequelize, DataTypes } from "../config/db.js";

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
    //TODO: categoria de tiendas
    tienda_categorias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // imagen_url: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
     //TODO: referenciar dueño - usuario vendedor
    // dueño: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },

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
