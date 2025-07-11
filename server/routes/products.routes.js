import { Router } from "express";
import { addProduct, deleteProduct,editProduct,getAllProducts,getUserProducts } from "../controllers/productController.js";
import userAuthenticate from "../middleware/userAuthenticate.js";
// import { verifyToken } from "../middleware/verifyToken.js";

 const router = Router();

 router.post('/addproduct', userAuthenticate, addProduct)
 router.delete('/deleteproduct/:id', deleteProduct)
 router.get('/myproduct', userAuthenticate, getUserProducts);
 router.put('/editproduct/:id', userAuthenticate, editProduct)

 

export default router;



// 686ce5259faa85c41ac97325
// 686ce5259faa85c41ac97325