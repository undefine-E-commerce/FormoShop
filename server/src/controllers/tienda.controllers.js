import { Logger } from "../loaders/logger.js";
import TiendaModel from "../models/tienda.js";
import { join } from "path";
import { unlink } from "fs";
import { v4 as uuidv4 } from "uuid";

const crearTienda = async (req, res) => {
  //TODO: falta agregar categoria-tienda
  //TODO: subida de archivos

  // const image = req.files;
  // //subida de archivos
  // const original_filename = image.name.split(".")[0];
  // const format = image.name.split(".")[1];
  // return res.json({ image: { original_filename, format } });

  try {
    const { nombre, descripcion, imagen_url } = req.body;
    if (!nombre || !descripcion || !imagen_url) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    // const file_name = uuidv4() + "." + format;
    // const uploadPath = join(import.meta.url, "../temp", file_name);

    // image.mv(uploadPath, function (err) {
    //   if (err) throw new Error(err);
    // });

    const tiendaExistente = await TiendaModel.findOne({ where: { nombre } });
    if (tiendaExistente) {
      return res
        .status(400)
        .json({ error: "Ese nombre de tienda ya está registrado" });
    }

    const nuevaTienda = await TiendaModel.create({
      nombre: nombre,
      descripcion: descripcion,
      imagen_url: imagen_url,
    });

    Logger.info("Tienda creada exitosamente: ", nuevaTienda);
    return res
      .status(201)
      .json({ mensaje: "Tienda creada exitosamente", tienda: nuevaTienda });
  } catch (error) {
    Logger.error("Error al crear una tienda", error);
    return res.status(500).json({ error: "No se pudo crear la tienda" });
  }
};

const obtenerTiendas = async (req, res) => {
  try {
    const tiendas = await TiendaModel.findAll();
    if (!tiendas) {
      return res.status(404).json({ error: "Tiendas no encontradas" });
    }
    return res
      .status(200)
      .json({ mensaje: "Tiendas obtenidas exitosamente", tiendas: tiendas });
  } catch (error) {
    Logger.error("Error al obtener las tiendas", error);
    return res.status(500).json({ error: "Error al obtener las tiendas" });
  }
};

const obtenerTienda = async (req, res) => {
  const { id } = req.params;
  try {
    const tienda = await TiendaModel.findByPk(id);
    if (!tienda) {
      return res.status(404).json({ error: "Tienda no existe" });
    }

    return res
      .status(200)
      .json({ mensaje: "Tienda obtenida exitosamente", tienda: tienda });
  } catch (error) {
    Logger.error("Error al obtener la tienda", error);
    return res.status(500).json({ error: "Error al obtener la tienda" });
  }
};

//TODO: repito, fix subida de imagenes y adaptar esto

const actualizarTienda = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen_url } = req.body;
  // const { image } = req.files;
  try {
    const tienda = await TiendaModel.findByPk(id);
    if (!tienda) {
      return res.status(404).json({ error: "Tienda no existe" });
    }
    await tienda.update({
      nombre,
      descripcion,
      imagen_url,
    });
    Logger.info("Tienda actualizada exitosamente", { tienda });
    return res
      .status(200)
      .json({ mensaje: "Tienda actualizada exitosamente", tienda: tienda });
  } catch (error) {
    Logger.error("Error al actualizar la tienda", error);
    return res.status(500).json({ error: "Error al actualizar la tienda" });
  }
};

const eliminarTienda = async (req, res) => {
  const { id } = req.params;
  try {
    const tienda = await TiendaModel.findByPk(id);
    if (!tienda) {
      return res.status(404).json({ error: "Tienda no existe" });
    }
    await tienda.destroy();
    Logger.info("Tienda eliminado exitosamente", { tienda });
    return res
      .status(200)
      .json({ mensaje: "Tienda eliminado exitosamente", tienda: tienda });
  } catch (error) {
    Logger.error("Error al eliminar la tienda", error);
    return res.status(500).json({ error: "Error al eliminar la tienda" });
  }
};

export {
  crearTienda,
  obtenerTiendas,
  obtenerTienda,
  actualizarTienda,
  eliminarTienda,
};
