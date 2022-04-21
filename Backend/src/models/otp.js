import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Otp = mongoose.model("Otp", OtpSchema);

export {Otp};
