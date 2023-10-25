import { sequelize, DataTypes } from "../config/db.js";

const UsuarioModel = sequelize.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  imagesrc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Agrega createdAt y updatedAt

});

// UsuarioModel.sync({ force: true }); // Opcional: Esto recreará la tabla en cada inicio

export default UsuarioModel;
