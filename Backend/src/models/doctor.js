import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";


// Internal Importa
import { generateError } from "../lib/common_utils.js";


const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  certifications: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  uniqueKey: {
    type: String,
    required: true,
    unique: true,
  },
  profilePictureUrl: {
    type: String,
  },
  designation: {
    type: String,
  },
  token: {
    type: String
  }
}, {
  timestamps: true
});

DoctorSchema.methods.generateToken = async function() {
  const user = this;
  const payload = {
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.CompanySecret);
  user.token = token;
  await user.save();
  return token;
};


DoctorSchema.statics.findByCredentials = async (email, password) => {
  const user = await Doctor.findOne({
    email: email,
  });
  if (!user) {
    throw generateError(404, "User not found");
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw generateError(401, "Password Incorrect");
  }
  return user;
};


DoctorSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});


const Doctor = mongoose.model("Doctor", DoctorSchema);

export {Doctor};
