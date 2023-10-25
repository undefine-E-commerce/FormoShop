import { Logger } from "../../loaders/logger.js";
import TiendaModel from "../models/tienda.js";

// Muestra todas las tiendas
export const showAllStores = async (req, res) => {
  try {
    const stores = await TiendaModel.findAll();
    res.status(200).json(stores);
  } catch (error) {
    Logger.error("Error al buscar todas las tiendas", error);
    res.status(500).json({ error: "No se pudieron recuperar las tiendas" });
  }
};

// Muestra una tienda específica por su ID
export const showStore = async (req, res) => {
  const storeId = req.params.id;

  try {
    const store = await TiendaModel.findByPk(storeId);

    if (!store) {
      res.status(404).json({ error: "Tienda no encontrada" });
      return;
    }

    res.status(200).json(store);
  } catch (error) {
    Logger.error("Error al buscar la tienda", error);
    res.status(500).json({ error: "No se pudo recuperar la tienda" });
  }
};

// Crea una nueva tienda
export const createStore = async (req, res) => {
  const { nombre, descripcion, image } = req.body;

  if (!nombre || !descripcion || !image) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const producto = await TiendaModel.create({
      nombre: nombre,
      descripcion: descripcion,
      image: "/temp" + image.name,
    });

    res.status(201).json(producto);
  } catch (error) {
    Logger.error("Error al crear la tienda", error);
    res.status(500).json({ error: "No se pudo crear la tienda" });
  }
};

// Actualiza una tienda existente
export const updateStore = async (req, res) => {
  const { id, nombre, descripcion, image } = req.body;

  if (!id || (!nombre && !descripcion && !image)) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const store = await TiendaModel.findByPk(id);

    if (!store) {
      res.status(404).json({ error: "Tienda no encontrada" });
      return;
    }

    // Actualiza los campos necesarios
    if (nombre) store.nombre = nombre;
    if (descripcion) store.descripcion = descripcion;
    if (image) store.image = "/temp" + image.name;

    await store.save();

    res.status(200).json(store);
  } catch (error) {
    Logger.error("Error al actualizar la tienda", error);
    res.status(500).json({ error: "No se pudo actualizar la tienda" });
  }
};

// Elimina una tienda por su ID
export const deleteStore = async (req, res) => {
  const storeId = req.params.id;

  try {
    const store = await TiendaModel.findByPk(storeId);

    if (!store) {
      res.status(404).json({ error: "Tienda no encontrada" });
      return;
    }

    await store.destroy();

    res.status(204).json();
  } catch (error) {
    Logger.error("Error al eliminar la tienda", error);
    res.status(500).json({ error: "No se pudo eliminar la tienda" });
  }
};
