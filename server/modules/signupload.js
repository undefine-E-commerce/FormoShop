import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

import "../public/js/config.js";

const apiSecret = cloudinary.config().api_secret;

export const signupload = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      source: "uw",
      folder: "signed_upload_demo_uw",
    },
    apiSecret
  );

  return { timestamp, signature };
};
export const signature = signupload.signature;
