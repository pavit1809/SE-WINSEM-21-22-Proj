import express from "express";


const router = new express.Router();
import { Otp } from "../models/otp.js";
import { RESPONSE_CODES } from "../lib/constants.js";
import { errorResponse, getOtp, generateError} from "../lib/common_utils.js";


router.post("/new", async (req, res) => {
  try {
    const existing = await Otp.findOne({phoneNumber: req.body.phoneNumber});
    if (existing){
      existing.otp = getOtp();
      await existing.save();
    }
    else {
      const otp = new Otp({
        ...req.body,
        otp: getOtp()
      });
      await otp.save();
    }
    // TODO: Add function for sending otp
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({message: "Otp Sent Successfully!"});
  } catch (err){
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/verify", async (req, res) => {
  try {
    const otp = await Otp.findOne({...req.body});
    if (!otp){
      throw generateError(RESPONSE_CODES.BAD_REQUEST_CODE, "Invalid Otp");
    }
    // TODO: Add function for sending otp
    res.status(RESPONSE_CODES.SUCCESS_CODE).send({message: "Otp Verified Successfully!"});
  } catch (err){
    console.log(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
