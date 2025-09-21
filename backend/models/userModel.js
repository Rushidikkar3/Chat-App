import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        gender:{
            type: String,
            required: true,
            enum: ["male", "female"] //by def 2 values are allowed
        },
        profilePic:{
            type: String,
            required: true,
            default:""
        },
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;