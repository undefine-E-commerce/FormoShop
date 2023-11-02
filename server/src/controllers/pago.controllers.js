import "dotenv/config";
import mercadopago from "mercadopago";
import { Logger } from "../loaders/logger.js";

//funcion hijueputa, creacion de preferencia para SDK mercado pago
//TODO: adaptar esto para su re-uso 
//toma un objeto con los siguientes atributos para crear una 'preference_id':
//product = {title, price,currency, quantity}.req.params
//DEVUELVE INITPOINT URL
//currency queda fijo en 'ARS' = peso argentino
//quantity deberia pasarse por el #carritoglobal. programar eso
//ojala lleguemos

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  });
  const { title, price, quantity } = req.body;
  try {
    const response = await mercadopago.preferences.create({
      items: [
        {
          title: title,
          unit_price: Number(price),
          currency_id: "ARS",
          quantity: Number(quantity),
        },
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/success`,
        failure: `${process.env.FRONTEND_URL}/failure`,
        pending: "",
      },
      auto_return: "approved",
    });
    console.log(response);

    if (!response.body.id) {
      return res.status(500).json({
        message: "No se pudo crear la preferencia",
      });
    }

    return res.status(200).json({
      PaymentId: response.body.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al crear la preferencia",
    });
  }
};
