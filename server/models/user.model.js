import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    fullName :{
        type : 'String' ,
        required: [true,'Please enter your name'],
        trim:true,
        minLength: '5',
        maxLength : '50'
    },
    email :{
        type:'String',
        required:[true,'Please Enter your Email'],
        unique:true,
        trim:true,
        lowerCase:true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true,'Please Enter your Password'],
        minLength: [6,'Password must be at least 6 characters'],
        select:false,
        // maxLength:[10,'Password must be less than 10 characters']
    },
    avatar: {
        type: String,
        // default: 'https://iconarchive.com/download/i108710/Flat-UI-Icons/User-Interface/user.ico'
    }
}, 
{
    timestamps:true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Method to compare password
userSchema.methods.comparePassword = async function (plainTextPassword) {
  return bcrypt.compare(plainTextPassword, this.password);
};

// ✅ Method to generate JWT
userSchema.methods.jwtToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const User = mongoose.model('User', userSchema);
export default User;