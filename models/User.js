const mongoose = require("mongoose");
const Joi=require("joi");
const jwt = require('jsonwebtoken')
//User Schema
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxlenght:20,
        minlenght:3,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        maxlenght:20,
        minlenght:10,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlenght:6,
    },
    profilePhoto:{
        type:Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId:null,
        }
    }
},
{timestamps:true,}
);

// Populate Posts That Belongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
});

//generate auth token
UserSchema.methods.generateAuthToken=function(){
    return jwt.sign({id: this._id, },process.env.jwt_SECRET);

}

//user model
const User= mongoose.model("User",UserSchema);

//validate register
function validateRegisterUser(obj){
    const schema=Joi.object({
        username: Joi.string().trim().min(3).max(20).required(), // Corrected method chaining
        email: Joi.string().trim().min(10).max(20).required().email(), // Corrected method chaining
        password: Joi.string().trim().min(6).required(), // Corrected method chaining
    });
    return schema.validate(obj);
}

//validate login
function validateLoginUser(obj){
    const schema=Joi.object({
        email: Joi.string().trim().min(10).max(20).required().email(), // Corrected method chaining
        password: Joi.string().trim().min(6).required(), // Corrected method chaining
    });
    return schema.validate(obj);
}

//validate update user
function validateUpdateUser(obj){
    const schema=Joi.object({
       username: Joi.string().trim().min(3).max(20).required(), // Corrected method chaining
        password: Joi.string().trim().min(6), // Corrected method chaining
    });
    return schema.validate(obj);
}

module.exports={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}