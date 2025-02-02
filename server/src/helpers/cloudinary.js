import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Utility function to upload image to Cloudinary
async function imageUploadUtil(fileBuffer ,mimetype) {
  try {
    // Validate file type
    if (!mimetype.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }

    // Validate file size (5MB limit)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB.");
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${mimetype};base64,${fileBuffer.toString("base64")}`,
      { resource_type: "auto" }
    );

    return result;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

export { upload, imageUploadUtil };
