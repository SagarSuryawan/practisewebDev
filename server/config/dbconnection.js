 import mongoose from "mongoose";

 mongoose.set('strictQuery', false)
 const connectdb = async () => {
    try {
        const {connection}  = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected to : ${connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
 }


 export default connectdb; 