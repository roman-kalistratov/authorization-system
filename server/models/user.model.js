import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },   
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationCode:String,
    verificationCodeExpires: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
