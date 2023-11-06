import { Logger } from "../loaders/logger.js";
import ProductoModel from "../models/producto.js";
import { join } from "path";
import { unlink } from "fs";
import { v4 as uuidv4 } from "uuid";

const crearProducto = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, imagen_url, precio } = req.body;
    if (!titulo || !descripcion || !imagen_url || !precio || !categoria) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const productoExistente = await ProductoModel.findOne({
      where: { titulo, descripcion, precio },
    });
    if (productoExistente) {
      return res
        .status(400)
        .json({ error: "Ese nombre de producto ya está registrado" });
    }

    const nuevoProducto = await ProductoModel.create({
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      categoria: categoria,
      imagen_url: imagen_url,
    });
    Logger.info("Producto creado exitosamente: ", { nuevoProducto });
    return res.status(201).json({
      mensaje: "Producto creado exitosamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    Logger.error("Error al crear un producto", error);
    return res.status(500).json({ error: "No se pudo crear el producto" });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll();
    if (!productos) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    return res.status(200).json({
      mensaje: "Productos obtenidos exitosamente",
      productos: productos,
    });
  } catch (error) {
    Logger.error("Error al obtener los productos", error);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await ProductoModel.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no existe" });
    }

    return res
      .status(200)
      .json({ mensaje: "Producto obtenido exitosamente", producto: producto });
  } catch (error) {
    Logger.error("Error al obtener la producto", error);
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
};

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen_url } = req.body;

  try {
    const producto = await ProductoModel.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no existe" });
    }
    await producto.update({
      nombre,
      descripcion,
      imagen_url,
    });
    Logger.info("Producto actualizada exitosamente", { producto });
    return res.status(200).json({
      mensaje: "Producto actualizada exitosamente",
      producto: producto,
    });
  } catch (error) {
    Logger.error("Error al actualizar la producto", error);
    return res.status(500).json({ error: "Error al actualizar la producto" });
  }
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await ProductoModel.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no existe" });
    }
    await producto.destroy();
    Logger.info("Producto eliminado exitosamente", { producto });
    return res
      .status(200)
      .json({ mensaje: "Producto eliminado exitosamente", producto: producto });
  } catch (error) {
    Logger.error("Error al eliminar la producto", error);
    return res.status(500).json({ error: "Error al eliminar la producto" });
  }
};

export {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
