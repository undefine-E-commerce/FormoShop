import { sequelize, DataTypes } from "../config/db.js";

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
      allowNull: false,
    },
    imagen_url: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
    //TODO: referenciar a que tienda pertecene cada producto
    //tienda:{
       //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
  }
);

export default ProductoModel;
