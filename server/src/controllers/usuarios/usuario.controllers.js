import { validationResult } from "express-validator";
import UsuarioModel from "../../models/usuario.js";
import { Logger } from "../../loaders/logger.js";

const crearUsuario = async (req, res) => {
  try {
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

    const usuarioExistente = await UsuarioModel.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

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

    Logger.info("Usuario creado exitosamente", nuevoUsuario);
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
    if (!usuarios) {
      return res.status(404).json({ error: "Usuarios no encontradas" });
    }
    return res
      .status(200)
      .json({ mensaje: "Usuarios obtenidos exitosamente", usuarios: usuarios });
  } catch (error) {
    Logger.error("Error al obtener los usuarios", error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const obtenerUsuario = async (req, res) => {
  const { Id } = req.params.id;

  try {
    const usuario = await UsuarioModel.findByPk(Id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    return res
      .status(200)
      .json({ mensaje: "Usuario obtenido exitosamente", usuario: usuario });
  } catch (error) {
    Logger.error("Error al obtener el usuario", error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  const { Id } = req.params.id;
  const { nombre, apellido, dni, email, nick_name, imagen_perfil, rol } =
    req.body;

  try {
    const usuario = await UsuarioModel.findByPk(Id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no existe" });
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
      .json({ mensaje: "Usuario actualizado exitosamente", usuario: usuario });
  } catch (error) {
    Logger.error("Error al actualizar el usuario", error);
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

const eliminarUsuario = async (req, res) => {
  const { Id } = req.params.id;

  try {
    const usuario = await UsuarioModel.findByPk(Id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    await usuario.destroy();

    Logger.info("Usuario eliminado exitosamente", { usuario });
    return res
      .status(200)
      .json({ mensaje: "Usuario eliminado exitosamente", usuario: usuario });
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
