import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const CategoriaProducto = sequelize.define("CategoriaProducto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  categoria_descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CategoriaProducto;
