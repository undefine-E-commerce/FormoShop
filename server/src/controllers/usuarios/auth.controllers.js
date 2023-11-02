import 'dotenv/config'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Logger } from "../../loaders/logger.js";
import UsuarioModel from "../../models/usuario.js";

//declaraciones en ingles por ahora, ya se adaptara al resto de controladores
export const register = async (req, res) => {
  try {
    const { email, contrasenia, nick_name } = req.body;
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const newUser = new UsuarioModel({
      nick_name: req.body.nick_name,
      email: req.body.email,
      contrasenia: hashedPassword,
    });

    const userSaved = await newUser.save();

    Logger.info("Usuario creado exitosamente", { userSaved });
    return res
      .status(201)
      .json({ mensaje: "Usuario registrado exitosamente", usuario: userSaved });
  } catch (error) {
    Logger.error("Error al registrar el usuario", error);
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, contrasenia } = req.body;
  try {
    const user = await UsuarioModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_JWT||'test123',
      {
        expiresIn: "1h", // Duración del token
      }
    );

    return res.json({ token });
  } catch (error) {
    Logger.error("Error al loguear el usuario", error);
    return res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};
