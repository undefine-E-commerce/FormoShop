import { sequelize, DataTypes } from "../config/db.js";

// Define el modelo de Rol
const RolModel = sequelize.define("Rols", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  descripcion: { type: DataTypes.STRING, allowNull: false },
});

RolModel.bulkBuild('Admin')
RolModel.bulkBuild('Vendedor')
RolModel.bulkBuild('Comprador')



export default RolModel;
