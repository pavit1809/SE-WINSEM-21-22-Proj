import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


import { generateError } from "../lib/common_utils.js";


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
  }
}, {
  timestamps: true
});


UserSchema.methods.generateToken = async function() {
  const user = this;
  const payload = {
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.CompanySecret);
  user.token = token;
  await user.save();
  return token;
};


UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email: email,
  });
  console.log(user);
  if (!user) {
    throw generateError(404, "User not found");
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw generateError(401, "Password Incorrect");
  }
  return user;
};


UserSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});


const User = mongoose.model("User", UserSchema);

export {User};
