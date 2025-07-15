 import {Router } from "express";
 import { register,login,logout,profile} from "../controllers/userController.js";
 import userAuthenticate from "../middleware/userAuthenticate.js"
 import {upload} from "../middleware/multer.middleware.js";


 const router = Router();

 router.post('/register',upload.single("avatar"), register)
 router.post('/login', login)
//  router.post('/logout/:id', logout)
 router.get('/me',userAuthenticate, profile);
 router.get('/logout', userAuthenticate, logout);

 

export default router;
