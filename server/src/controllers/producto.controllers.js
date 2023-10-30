import { Logger } from "../../loaders/logger.js";
import ProductoModel from "../models/producto.js";
import { join } from "path";
import { unlink } from "fs";
import { v4 as uuidv4 } from "uuid";


export const obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll();
    res.status(200).json(productos);
  } catch (error) {
    Logger.error("Error al buscar todos los productos", error);
    res.status(500).json({ error: "No se pudieron recuperar los productos" });
  }
};


export const obtenerProducto = async (req, res) => {
  const { productId } = req.params.id;

  try {
    const producto = await UsuarioModel.findByPk(productId);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    Logger.error("Error al buscar el producto", error);
    res.status(500).json({ error: "No se pudo recuperar el producto" });
  }
};


export const crearProducto = async (req, res) => {
  const { titulo, descripcion, precio, imagen_url } = req.body;
  // const image = req.files;
  // //subida de archivos
  // const original_filename = image.name.split(".")[0];
  // const format = image.name.split(".")[1];
  // return res.json({ image: { original_filename, format } });

  if (!titulo || !descripcion || !precio || !imagen_url) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // const file_name = uuidv4() + "." + format;
    // const uploadPath = join(import.meta.url, "../temp", file_name);

    // image.mv(uploadPath, function (err) {
    //   if (err) throw new Error(err);
    // });

    const producto = await ProductoModel.create({
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      // image: uploadPath,
      image: imagen_url,
      // image: { original_filename, format, file_name },
    });

    res.status(201).json(producto);
  } catch (error) {
    Logger.error("Error al crear un producto", error);
    res.status(500).json({ error: "No se pudo crear el producto" });
  }
};


export const actualizarProducto = async (req, res) => {
  const { productId } = req.params.id;
  const { titulo, descripcion, precio } = req.params;
  const { image } = req.files;

  // return res.json({image: { original_filename, format,  }});

  if (!productId || (!titulo && !descripcion && !precio && !image)) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const producto = await ProductoModel.findByPk(productId);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualiza los campos necesarios
    if (titulo) producto.titulo = titulo;
    if (descripcion) producto.descripcion = descripcion;
    if (precio) producto.precio = precio;
    if (image) {
      const original_filename = image.name.split(".")[0];
      const format = image.name.split(".")[1];
      const new_file_name = uuidv4() + "." + format;
      const unlinkPath = join(
        import.meta.url,
        "../images",
        producto.image.file_name
      );
      unlink(unlinkPath, function (err) {
        if (!err) {
          Logger.info("Product image eliminada");
        } else {
          console.log(err);
        }
      });

      const uploadPath = join(import.meta.url, "../temp", new_file_name);

      producto.image.original_filename = original_filename;
      producto.image.format = format;
      producto.image.file_name = new_file_name;

      image.mv(uploadPath, function (err) {
        if (err) throw new Error(err);
      });
    }

    await producto.update();

    res.status(200).json(producto);
  } catch (error) {
    Logger.error("Error al actualizar el producto", error);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
};

// Elimina un producto por su ID
export const eliminarProducto = async (req, res) => {
  const { productId } = req.params.id;

  try {
    const producto = await UsuarioModel.findByPk(productId);

    if (!producto) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const uploadPath = join(
      import.meta.url,
      "../temp",
      `${producto.image.file_name}`
    );

    unlink(uploadPath, function (err) {
      if (!err) {
        Logger.info("Product image eliminada");
      }
    });

    await producto.destroy();

    res.status(204).json();
  } catch (error) {
    Logger.error("Error al eliminar el producto", error);
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};
