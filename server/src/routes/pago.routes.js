import { Router } from "express";
import { createOrder } from "../controllers/pago.controllers.js";
const router = Router();

//creacion de preferencia
router.post("/create-order", createOrder);


router.get("/success", (req, res) => res.send("Orden pagada"));
//el pago se envia pero queda en ""pendiente"", se procesa y luego se confirma
//evento de verificacion que se realiza luego de la operacion real,
router.get("/webhook", (req, res) => res.send("webhook"));

export default router;
