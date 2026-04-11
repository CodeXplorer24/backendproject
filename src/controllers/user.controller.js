import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/apiResponse.js";

const registerUser = asyncHandler (async (req,res,next) => {
    // res.status(200).json(
    //     {message: "ok"}
    // )
    // recieve data from client 
    const {fullName, username, password, email} = req.body;
    console.log(fullName, email, username);

    // check for blank field and also trim 
    if([fullName, username, password, email].some((field) => field?.trim() === "")){
        throw new ApiError(400, "This field is required");
    }

    const isUserExist = await User.findOne({
        $or: [{username: username},{email: email}]
    });

    if(isUserExist){
        throw new ApiError(409, "User alreday exists");
    }

    // getting local paths of images through multer
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }
    // uploading images on cloudinary 
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar is required");
    }

    // creating fields in db
    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email: email.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })
    // remove password and refreshToken from resp
    const UserCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!UserCreated){
        throw new ApiError(500, "Something went wrong on registring the user");
    }

    // now send resp to the user

    return res.status(201).json(
        new ApiResponse(200, UserCreated, "User registered successfully")
    )
    next();
})

export {registerUser};