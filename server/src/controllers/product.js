import { Logger } from "../../loaders/logger.js";
import ProductoModel from "../models/producto.js";
import { join } from "path";
import { unlink } from "fs";
import { v4 as uuidv4 } from "uuid";

// Muestra todos los productos
export const showAllProducts = async (req, res) => {
  try {
    const products = await ProductoModel.findAll();
    res.status(200).json(products);
  } catch (error) {
    Logger.error("Error al buscar todos los productos", error);
    res.status(500).json({ error: "No se pudieron recuperar los productos" });
  }
};

// Muestra un producto específico por su ID
export const showProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductoModel.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    Logger.error("Error al buscar el producto", error);
    res.status(500).json({ error: "No se pudo recuperar el producto" });
  }
};

// Crea un nuevo producto

export const createProduct = async (req, res) => {
  const { titulo, descripcion, precio, image } = req.body;
  // const image = req.files;
  // //subida de archivos
  // const original_filename = image.name.split(".")[0];
  // const format = image.name.split(".")[1];
  // return res.json({ image: { original_filename, format } });

  if (!titulo || !descripcion || !precio || !image) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
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
      image: image,
      // image: { original_filename, format, file_name },
    });

    res.status(201).json(producto);
  } catch (error) {
    Logger.error("Error al crear un producto", error);
    res.status(500).json({ error: "No se pudo crear el producto" });
  }
};

// Actualiza un producto existente
export const updateProduct = async (req, res) => {
  const { productId } = req.params.id;
  const { titulo, descripcion, precio } = req.params;
  const { image } = req.files;

  // return res.json({image: { original_filename, format,  }});

  if (!id || (!titulo && !descripcion && !precio && !image)) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const product = await ProductoModel.findByPk(productId);

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    // Actualiza los campos necesarios
    if (titulo) product.titulo = titulo;
    if (descripcion) product.descripcion = descripcion;
    if (precio) product.precio = precio;
    if (image) {
      const original_filename = image.name.split(".")[0];
      const format = image.name.split(".")[1];
      const new_file_name = uuidv4() + "." + format;
      const unlinkPath = join(
        import.meta.url,
        "../temp",
        product.image.file_name
      );
      unlink(unlinkPath, function (err) {
        if (!err) {
          Logger.info("Product image eliminada");
        } else {
          console.log(err);
        }
      });

      const uploadPath = join(import.meta.url, "../temp", new_file_name);

      product.image.original_filename = original_filename;
      product.image.format = format;
      product.image.file_name = new_file_name;

      image.mv(uploadPath, function (err) {
        if (err) throw new Error(err);
      });
    }

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    Logger.error("Error al actualizar el producto", error);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
};

// Elimina un producto por su ID
export const deleteProduct = async (req, res) => {
  const { productId } = req.params.id;

  try {
    const product = await ProductoModel.findByPk(productId);

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    const uploadPath = join(
      import.meta.url,
      "../temp",
      `${book.image.file_name}`
    );

    unlink(uploadPath, function (err) {
      if (!err) {
        Logger.info("Product image eliminada");
      }
    });

    await product.destroy({ id: productId });

    res.status(204).json();
  } catch (error) {
    Logger.error("Error al eliminar el producto", error);
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};
