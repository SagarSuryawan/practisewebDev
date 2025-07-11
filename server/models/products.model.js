
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: [String,Number],
        required:[true, 'Please Enter Product Name'],
        minLength:[3, 'Product Name must be at least 3 characters'],
        maxLength:[10, 'Product Name must be less than 10 characters']
    },
    quantity:{
        type:Number,
        required:[true, 'Please Enter Product Quantity'],
        min: [1, 'Quantity must be at least 1'],
        max: [1000, 'Quantity must be less than 1000']
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true
  }
})


const Product = mongoose.model('Product', productSchema);

export default Product;