
import User from '../models/user.model.js';
import AppError from '../utils/error.utils.js';
// import uploadOnCloudinary from '../utils/fileUpload.js';
import fs from 'fs'; // to delete temp file
import { uploadToCloudinary } from '../middleware/multer.middleware.js';




const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents client-side JavaScript from accessing the cookie
    secure:false,
    sameSite: "Lax",
  
};



const register = async(req,res,next) => {

    try {
        const { fullName,email,password } = req.body;

        if(!fullName || !email || !password || !req.file) {
            return next(new AppError("all feilds are Required",400))
        }
        console.log(req.file);

        // if user exists   
        const existUser = await User.findOne({email})
        if(existUser){
            return next(new AppError("Email Already Exist",400))
        }

        //  Check  avatar was uploaded
        let avatarUrl = "";
        if (req.file) {
        const localPath = req.file.path;
        const cloudinaryRes = await uploadToCloudinary(localPath);

        if (!cloudinaryRes) {
            return next(new AppError("Avatar upload failed", 500));
        }

         avatarUrl = cloudinaryRes.secure_url;
        // fs.unlinkSync(localPath);
    }
        const user = await User.create({
            fullName,
            email,
            password,
            avatar:avatarUrl,
        });

        if(!user){
            return next(new AppError("User not Created",400))
        }

        // user save 
        // await user.save();
        user.password = undefined;  // to not send password in response

        // user created successfully then login automatocally
        const token = user.jwtToken();

        // decode token to get user details
        //  const decodeToken = verifyToken(token);
        // console.log("Decoded Token:", decodeToken);


        // store token in cookie
        res.cookie('token', token, cookieOption);


        res.status(201).json({
            success:true,
            message:"User Created Successfully",
            user
        });
     
    } catch (error) {
        next(error)
    }
};
   
        
  





   const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Email or password does not match", 401));
        }

        const token = user.jwtToken(); 
        user.password = undefined; // Do not send password in response

        res.cookie('token', token, cookieOption);

        res.status(200).json({
            success: true,
            message: "User login successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

const logout = (req, res) => {

   try {
        const cookieOption = {
            secure:false,
            httpOnly:true,
            sameSite: "Lax" 
        }
        res.clearCookie("token",cookieOption)
        
        return res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
};

const profile = async(req,res,next) =>{
    try {
    const user = await User.findById(req.params.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user)

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
}



export{
    register,
    login,
    logout,
    profile
}