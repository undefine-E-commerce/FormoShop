import "dotenv/config";

// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from "mercadopago";

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

// Crear un objeto de preferencia
let preference = {
  // el "purpose": "wallet_purchase" solo permite pagos registrados
  // para permitir pagos de guests puede omitir esta propiedad
  // purpose: "wallet_purchase",
  items: [
    {
      id: "item-ID-1234",
      title: "Mi Producto 123",
      quantity: 1,
      unit_price: 666.666,
    },
  ],
};

// // Step 3: Initialize the API object
// const payment = new Payment(client);

// // Step 4: Create the request object
// const body = {
//   transaction_amount: 10.9,
//   description: "Banana",
//   payment_method_id: "1",
//   payer: {
//     email: "facundomajda14@gmail.com",
//   },
// };

// // Step 5: Make the request
// payment.create({ body }).then(console.log).catch(console.log);
