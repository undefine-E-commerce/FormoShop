import { Logger } from "../../loaders/logger.js";
import TiendaModel from "../models/tienda.js";
import { join } from "path";
import { unlink } from "fs";
import { v4 as uuidv4 } from "uuid";

// Muestra todos los tiendas
export const obtenerTiendas = async (req, res) => {
  try {
    const tiendas = await TiendaModel.findAll();
    res.status(200).json(tiendas);
  } catch (error) {
    Logger.error("Error al buscar todos los tiendas", error);
    res.status(500).json({ error: "No se pudieron recuperar los tiendas" });
  }
};

// Muestra un tienda específico por su ID
export const obtenerTienda = async (req, res) => {
  const { storeId } = req.params.id;

  try {
    const tienda = await UsuarioModel.findByPk(storeId);

    if (!tienda) {
      return res.status(404).json({ error: "Tienda no encontrado" });
    }

    res.status(200).json(tienda);
  } catch (error) {
    Logger.error("Error al buscar el tienda", error);
    res.status(500).json({ error: "No se pudo recuperar el tienda" });
  }
};

// Crea un nuevo tienda
export const crearTienda = async (req, res) => {
  const { titulo, descripcion, imagen_url } = req.body;
  // const image = req.files;
  // //subida de archivos
  // const original_filename = image.name.split(".")[0];
  // const format = image.name.split(".")[1];
  // return res.json({ image: { original_filename, format } });

  if (!titulo || !descripcion || !imagen_url) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // const file_name = uuidv4() + "." + format;
    // const uploadPath = join(import.meta.url, "../temp", file_name);

    // image.mv(uploadPath, function (err) {
    //   if (err) throw new Error(err);
    // });

    const tienda = await TiendaModel.create({
      titulo: titulo,
      descripcion: descripcion,

      // image: uploadPath,
      // image: image,
      // image: { original_filename, format, file_name },
    });

    res.status(201).json(tienda);
  } catch (error) {
    Logger.error("Error al crear un tienda", error);
    res.status(500).json({ error: "No se pudo crear el tienda" });
  }
};

// Actualiza un tienda existente
export const actualizarTienda = async (req, res) => {
  const { storeId } = req.params.id;
  const { titulo, descripcion } = req.params;
  const { image } = req.files;

  // return res.json({image: { original_filename, format,  }});

  if (!storeId || (!titulo && !descripcion && !image)) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const tienda = await TiendaModel.findByPk(storeId);

    if (!tienda) {
      return res.status(404).json({ error: "Tienda no encontrado" });
    }

    // Actualiza los campos necesarios
    if (titulo) tienda.titulo = titulo;
    if (descripcion) tienda.descripcion = descripcion;

    if (image) {
      const original_filename = image.name.split(".")[0];
      const format = image.name.split(".")[1];
      const new_file_name = uuidv4() + "." + format;
      const unlinkPath = join(
        import.meta.url,
        "../images",
        tienda.image.file_name
      );
      unlink(unlinkPath, function (err) {
        if (!err) {
          Logger.info("Store image eliminada");
        } else {
          Logger.error(err);
          console.log(err);
        }
      });

      const uploadPath = join(import.meta.url, "../temp", new_file_name);

      tienda.image.original_filename = original_filename;
      tienda.image.format = format;
      tienda.image.file_name = new_file_name;

      image.mv(uploadPath, function (err) {
        if (err) throw new Error(err);
      });
    }

    await tienda.update();

    res.status(200).json(tienda);
  } catch (error) {
    Logger.error("Error al actualizar el tienda", error);
    res.status(500).json({ error: "No se pudo actualizar el tienda" });
  }
};

// Elimina un tienda por su ID
export const eliminarTienda = async (req, res) => {
  const { storeId } = req.params.id;

  try {
    const tienda = await UsuarioModel.findByPk(storeId);

    if (!tienda) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const uploadPath = join(
      import.meta.url,
      "../temp",
      `${tienda.image.file_name}`
    );

    unlink(uploadPath, function (err) {
      if (!err) {
        Logger.info("Store image eliminada");
      }
    });

    await tienda.destroy();

    res.status(204).json();
  } catch (error) {
    Logger.error("Error al eliminar el tienda", error);
    res.status(500).json({ error: "No se pudo eliminar el tienda" });
  }
};
