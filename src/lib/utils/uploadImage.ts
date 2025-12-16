import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "food-images",
  });

  return result.secure_url;
};
