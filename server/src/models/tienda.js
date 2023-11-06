import { sequelize, DataTypes } from "../config/db.js";
import UsuarioModel from "./usuario.js";

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
      allowNull: true,
    },
    vendedor: {
      type: DataTypes.STRING,
      // allowNull: true,
      // references: {
      //   model: UsuarioModel,
      //   key: "id",
      // },
    },
  },
  {
    timestamps: true,
  }
);

export default TiendaModel;
