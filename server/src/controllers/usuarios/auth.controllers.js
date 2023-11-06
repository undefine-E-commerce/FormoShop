import "dotenv/config";
import bcrypt from "bcryptjs";
import { Logger } from "../../loaders/logger.js";
import UsuarioModel from "../../models/usuario.js";
import createToken from "../../libs/jwt.js";
export const register = async (req, res) => {
  try {
    // const { email, contrasenia, nick_name } = req.body;
    const { nombre, apellido, dni, nick_name, contrasenia, email } = req.body;

    // Verificar si el email y la contraseña están presentes
    if (!email || !contrasenia) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const userSaved = await UsuarioModel.create({
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      nick_name: nick_name,
      email: email,
      contrasenia: hashedPassword,
    });

    const token = await createToken({
      userId: userSaved.id,
      email: userSaved.email,
    });

    Logger.info("Usuario registrado exitosamente", {
      Usuario: userSaved,
      token: token,
    });

    res.cookie("token", token);

    return res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: {
        id: userSaved.id,
        nick_name: userSaved.nick_name,
        email: userSaved.email,
      },
      token: token,
    });
  } catch (error) {
    // Si hay un error, registrar el error y devolver un error
    Logger.error("Error al registrar el usuario", error);
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, contrasenia } = req.body;

  try {
    const userFound = await UsuarioModel.findOne({
      where: { email: email },
    });

    if (!userFound) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    const isPasswordValid = await bcrypt.compare(
      contrasenia,
      userFound.contrasenia
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const token = await createToken({
      id: userFound.id,
      email: userFound.email,
    });

    res.cookie("token", token);

    return res.json({
      mensaje: "Usuario Logueado exitosamente",
      usuario: {
        id: userFound.id,
        nick_name: userFound.nick_name,
        email: userFound.email,
      },
      token: token,
    });
  } catch (error) {
    Logger.error("Error al loguear el usuario", error);
    return res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ mensaje: "Usuario deslogueado exitosamente" });
};

export const profile = async (req, res) => {
  const { id } = req.body;
  try {
    const userId = req.body.id;
    const userFound = await UsuarioModel.findById(userId);
    if (!userFound) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    Logger.info({ Usuario: req.user });
    return res.json({
      mensaje: "Perfil de usuario",
      usuario: {
        id: userFound.id,
        nick_name: userFound.nick_name,
        email: userFound.email,
      },
    });
  } catch (error) {
    Logger.error("Error al obtener el perfil del usuario", error);
    return res
      .status(500)
      .json({ error: "Error al obtener el perfil del usuario" });
  }
};
