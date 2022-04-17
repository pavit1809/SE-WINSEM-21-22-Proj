import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";


// Internal Importa
import { genCode } from "../lib/common_utils.js";


const DoctorSchema = new mongoose.Schema({
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
  certifications: {
    type: [{
      proofOf: String,
      docId: mongoose.Schema.Types.ObjectId
    }],
    required: true
  },
  uniqueKey: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
});


DoctorSchema.statics.findByCredentials = async (email, password) => {
  const doctor = await Doctor.findOne({
    email: email,
  });
  if (!doctor) {
    throw new Error("User not found");
  }
  const passwordMatched = await bcrypt.compare(password, doctor.password);
  if (!passwordMatched) {
    return "Password Incorrect";
  }
  return doctor;
};


DoctorSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.uniqueKey = genCode(10);
    this.password = hash;
  }
  next();
});


const Doctor = mongoose.model("Doctor", DoctorSchema);

export {Doctor};
