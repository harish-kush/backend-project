import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// importing User for checking user exists or not
import { User } from '../models/user.model.js';

// importing cloudinary for uploading images
import { uploadOnCloudinary } from '../utils/cloudinary.js';

import ApiResponse from '../utils/ApiResponse.js';
export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, username, password } = req.body;
    if(!fullName || !email || !username || !password){
        return next(new ApiError(400, "Please provide all details"));
    }
    
    // checking if users already exists or not
    const existedUser = User.findOne({
        $or: [{ email }, { username }],
    })

    if(existedUser){
        throw new ApiError(409,"user already exists");
    }
    
    // checking for images 
   const avatarLocalPath = req.files?.avatar[0] ?path : null;
   const coverImagelocalPath = req.files?.coverImage[0] ?path : null;

   if(!avatarLocalPath){
       throw new ApiError(400, "Please provide all images");
   }


   // uploading images on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImagelocalPath);
   if(!avatar || !coverImage){
       throw new ApiError(500, "Image upload failed");
   }

   // saving user in database
  const user = await user.create({
         fullName,
         email,
         username: username.toLowerCase(),
         password,
         avatar : avatar.url,
         coverImage : coverImage?.url||"",
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken");

   if(!createdUser){
       throw new ApiError(500, "User creation failed");
   }
    
   return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
});
