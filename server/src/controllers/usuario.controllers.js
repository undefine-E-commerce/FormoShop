import { validationResult } from "express-validator";
import UsuarioModel from "../models/usuario.js";
import { Logger } from "../../loaders/logger.js";


const crearUsuario = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      const erroresArray = errores.array();
      return res
        .status(400)
        .json({ error: "Datos de usuario inválidos", detalles: erroresArray });
    }

    const {
      nombre,
      apellido,
      contrasenia,
      dni,
      email,
      nick_name,
      imagen_perfil,
      rol,
    } = req.body;

    // Buscar si ya existe un usuario con el mismo email
    const usuarioExistente = await UsuarioModel.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = await UsuarioModel.create({
      nombre,
      apellido,
      contrasenia,
      dni,
      email,
      nick_name,
      imagen_perfil,
      rol,
    });

    Logger.info("Usuario creado exitosamente", { nuevoUsuario });
    return res
      .status(201)
      .json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    Logger.error("Error al crear el usuario", error);
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};


const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAll();
    return res
      .status(200)
      .json({ mensaje: "Usuarios obtenidos exitosamente", usuarios });
  } catch (error) {
    Logger.error("Error al obtener los usuarios", error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};


const obtenerUsuario = async (req, res) => {
  const { usuarioId } = req.params.id;

  try {
    const usuario = await UsuarioModel.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res
      .status(200)
      .json({ mensaje: "Usuario obtenido exitosamente", usuario });
  } catch (error) {
    Logger.error("Error al obtener el usuario", error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};


const actualizarUsuario = async (req, res) => {
  const { usuarioId } = req.params.id;
  const { nombre, apellido, dni, email, nick_name, imagen_perfil, rol } =
    req.body;

  try {
    const usuario = await UsuarioModel.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }


    await usuario.update({
      nombre,
      apellido,
      dni,
      email,
      nick_name,
      imagen_perfil,
      rol,
    });

    Logger.info("Usuario actualizado exitosamente", { usuario });
    return res
      .status(200)
      .json({ mensaje: "Usuario actualizado exitosamente", usuario });
  } catch (error) {
    Logger.error("Error al actualizar el usuario", error);
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const { usuarioId } = req.params.id;

  try {
    const usuario = await UsuarioModel.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.destroy();

    Logger.info("Usuario eliminado exitosamente", { usuario });
    return res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    Logger.error("Error al eliminar el usuario", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
