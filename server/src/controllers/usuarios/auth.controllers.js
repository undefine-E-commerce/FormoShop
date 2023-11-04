import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Logger } from "../../loaders/logger.js";
import UsuarioModel from "../../models/usuario.js";
import createToken from "../../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, contrasenia, nick_name } = req.body;

    if (!email || !contrasenia) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son obligatorios" });
    }
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const userSaved = await UsuarioModel.create({
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
    return res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: userSaved,
      token: token,
    });
  } catch (error) {
    Logger.error("Error al registrar el usuario", error);
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, contrasenia } = req.body;

  const token = await createToken({ userId: user.id, email: user.email });

  try {
    const user = await UsuarioModel.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.json({ token });
  } catch (error) {
    Logger.error("Error al loguear el usuario", error);
    return res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};
