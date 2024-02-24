import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dwjhsf65j",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryUpload = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "products",
  });
  console.log(result);
};
