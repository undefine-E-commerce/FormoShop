import "dotenv/config";
import jwt from "jsonwebtoken";
import { Logger } from "../loaders/logger.js";
const key = process.env.SECRET_KEY;

export const authRequired = (req, res, next) => {
  const {token }= req.cookies;

  if (!token) {
    Logger.error("Token no proporcionado");
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    Logger.info("Token validado", token);
    next();
  } catch (error) {
    Logger.error("Token inválido", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};

// export default authRequired;
