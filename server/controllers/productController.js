import Product from '../models/products.model.js';
import AppError from '../utils/error.utils.js';

export const addProduct = async( req,res, next) => {

    try {
        const { productName, quantity } = req.body;

    if (!productName || !quantity) {
        return next(new AppError("All fields are required", 400));
    }
    console.log("Authenticated user ID:", req.user._id);

    const product = await Product.create({
        productName,
        quantity,
        user: req.user._id
    });

    console.log(product.user)

    if (!product) {
        return next(new AppError("Product not created", 400));
    }

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    });
    } catch (error) {
        return next(new AppError("An error occurred while adding the product", 500));
        
    }
    
}

export const getUserProducts = async (req,res,next) => {
    try {
    const products = await Product.find({ user: req.user._id }); // ✅ filter by current user

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  } 
}

export const editProduct = async (req, res, next) => {
    const { id } = req.params;
    const { productName, quantity } = req.body;

    if (!id) {
        return next(new AppError("Product ID is required", 400));
    }

    if (!productName || !quantity) {
        return next(new AppError("All fields are required", 400));
    }

    const product = await Product.findByIdAndUpdate(id, { productName, quantity }, { new: true });

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product
    });
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (!products || products.length === 0) {
            return next(new AppError("No products found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        return next(new AppError("An error occurred while fetching products", 500));
    }
}


export const deleteProduct = async (req, res, next) => {
    try {
         const { id } = req.params;

    if (!id) {
        return next(new AppError("Product ID is required", 400));
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        product
    });
         
    } catch (error) {
        return next(new AppError("An error occurred while deleting the product", 500));
        
    }
}

