import mongoose, { Document, model, Schema } from "mongoose";
import { Iuser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";

interface userData extends Document , Iuser{}

const userSchema : Schema<userData> = new Schema({
   name: {
    type: String,
    required: [true, " please privide your email"],

   },
   email : {
    type: String,
    required: [true, "please enter your email"],
    lowercase: true,
    unique: true,
    validate: [isEmail, " please enter a valid your email"]
   },
   password: {
    type: String,
    required : [true, " please enter your password"],
    minlength: 6
   },
   confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    minlength: 6
   },
   
}, {versionKey: false , timestamps: true})


const userModel = mongoose.model<userData>("userDetailCollections", userSchema)

export default userModel