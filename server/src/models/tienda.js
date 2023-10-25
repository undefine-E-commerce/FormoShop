import { sequelize, DataTypes } from "../config/db.js";
import ProductoModel from "./producto.js";

const TiendaModel = sequelize.define(
  "Tienda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // productos: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

// Define la relación entre Tienda y Producto (una tienda tiene varios productos)
// TiendaModel.hasMany(ProductoModel, { foreignKey: "tienda_id" }); // Asegúrate de que "tienda_id" coincida con la clave foránea en el modelo Producto

// TiendaModel.sync({ force: true }); // Opcional: Esto recreará la tabla en cada inicio

export default TiendaModel;
