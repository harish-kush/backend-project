import mongoose ,{ Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        unique : true,
        trim : true,
        minlength : 3,
        lowercase : true,
        index:true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    fullname:{
        type : String,
        required : true,
        trim : true,
        index:true
    },
    avatar:{
        type : String,
        required : true,
        default : "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1624489863/avatars/default_avatar.png"
    },
    coverImage:{
        type : String,
        required : true,
        default : "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1624489863/avatars/default_cover.png"
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref : 'Video',
    }],
    password:{
        type : String,
        required : [true, 'Password is required'],
        minlength : 6
    },
    refreshToken:{
        type : String
    },
},{timestamps:true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
       return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// custom method making 

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password);
}

     userSchema.methods.generateAccessToken = function(){
        return jwt.sign({
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname: this.fullname,
        },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    }
    )
 }

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
        
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES
}
)
    }

export const User = mongoose.model("User", userSchema);