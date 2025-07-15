import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../utils/fileUpload';


const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: 'uploads',
    allowed_formats:[],
    transformation: [{width: 500, height: 500, crop: 'limit'}]
  }
});

const upload = multer({Storage});

export default upload;