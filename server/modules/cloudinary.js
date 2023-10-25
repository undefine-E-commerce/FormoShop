import { v2 as cloudinary } from "cloudinary";

export const myconfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.uploader.upload;

// Log the configuration
console.log("Credenciales de cloudinary", cloudinary.config());

//agregar esta parte a componente de frontend

// // import { v2 as cloudinary } from "cloudinary";
// const cloudName = "djtwvtbof";

// const myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: cloudName,
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//       document
//         .getElementById("uploadedimage")
//         .setAttribute("src", result.info.secure_url);
//     }
//   }
// );

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
