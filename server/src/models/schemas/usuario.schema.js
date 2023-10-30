import { check } from "express-validator";

export const createUserSchema = [
  check("nombre", "El nombre es requerido").notEmpty(),
  check("apellido", "El apellido es requerido").notEmpty(),
  check("dni", "El DNI es requerido").notEmpty(),
  check("email", "El email es requerido").isEmail(),
  check("nick_name", "El nick_name es requerido").notEmpty(),
  check("imagen_perfil", "La imagen de perfil es requerida").notEmpty(),
  check("rol", "El rol es requerido").notEmpty(),
];

export const updateUserSchema = [
  check("nombre", "El nombre es requerido").notEmpty(),
  check("apellido", "El apellido es requerido").notEmpty(),
  check("dni", "El DNI es requerido").notEmpty(),
  check("email", "El email es requerido").isEmail(),
  check("nick_name", "El nick_name es requerido").notEmpty(),
  check("imagen_perfil", "La imagen de perfil es requerida").notEmpty(),
  check("rol", "El rol es requerido").notEmpty(),
];
