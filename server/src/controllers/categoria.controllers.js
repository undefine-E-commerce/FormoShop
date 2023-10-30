import { Logger } from "../../loaders/logger.js";
import CategoriaModel from "../models/categoria.js";
import { validationResult } from "express-validator";
import { Logger } from "../../loaders/logger.js";
import CategoriaModel from "../models/categoria.js";

const crearCategoria = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      const erroresArray = errores.array();
      return res.status(400).json({
        error: "Datos de categoría inválidos",
        detalles: erroresArray,
      });
    }

    const { nombre, descripcion } = req.body;

    const categoriaExistente = await CategoriaModel.findOne({
      where: { nombre },
    });

    if (categoriaExistente) {
      return res.status(400).json({ error: "La categoría ya está registrada" });
    }

    const nuevaCategoria = await CategoriaModel.create({
      nombre,
      descripcion,
    });

    Logger.info("Categoría creada exitosamente", { nuevaCategoria });
    return res.status(201).json({
      mensaje: "Categoría creada exitosamente",
      categoria: nuevaCategoria,
    });
  } catch (error) {
    Logger.error("Error al crear la categoría", error);
    return res.status(500).json({ error: "Error al crear la categoría" });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaModel.findAll();

    if (!categorias) {
      return res.status(404).json({ error: "Categorías no encontradas" });
    }

    return res
      .status(200)
      .json({ mensaje: "Categorías obtenidas exitosamente", categorias });
  } catch (error) {
    Logger.error("Error al obtener las categorias", error);
    return res.status(404).json({ error: "Categorías no encontradas" });
  }
};

const actualizarCategoria = async (req, res) => {
  const { categoriaId } = req.params.id;

  try {
    const categoria = await CategoriaModel.findByPk(categoriaId);

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await categoria.update({
      nombre,
      descripcion,
    });

    Logger.info("Usuario actualizado exitosamente", { categoria });
  } catch (error) {
    Logger.error("Error al actualizar la categoria", error);
    return res.status(404).json({ error: "Categoría no actualizada" });
  }
};

const obtenerCategoria = async (req, res) => {
  const { categoriaId } = req.params.id;

  try {
    const categoria = await CategoriaModel.findByPk(categoriaId);

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    return res
      .status(200)
      .json({ mensaje: "Categoría obtenida exitosamente", categoria });
  } catch (error) {
    Logger.error("Error al obtener la categoria", error);
    return res.status(404).json({ error: "Categoría no encontrada" });
  }
};

const eliminarCategoria = async (req, res) => {};

export {
  crearCategoria,
  obtenerCategoria,
  eliminarCategoria,
  actualizarCategoria,
};
