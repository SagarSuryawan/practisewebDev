import multer from 'multer';
import fs from 'fs';
import cloudinary from '../utils/fileUpload.js';

const upload = multer({ dest: 'temp/' });

export const uploadToCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'uploads',
    });
    fs.unlinkSync(localFilePath); // remove temp file if successfully uploaded
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove temp file if upload fails
    throw error;
  }
};

export default upload;
