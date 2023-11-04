import { sequelize, DataTypes } from "../config/db.js";

const UsuarioModel = sequelize.define(
  "Usuarios",
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
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // imagen_perfil: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // rol: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default UsuarioModel;
