import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


import { errorResponse, generateError } from "../lib/common_utils.js";
import { User } from "../models/user.js";
import { Doctor } from "../models/doctor.js";
import { RESPONSE_CODES } from "../lib/constants.js";


export const auth = async (req, res, next) => {
  try {
    const {token, role} = req.body;
    if (token === undefined || role === undefined){
      throw generateError(400, "Token/Role not present");
    }
    const decoded = jwt.verify(token, process.env.CompanySecret);
    if (role === "user"){
      const user = await User.findOne({
        _id: decoded._id,
        token: token
      });
      if (!user){
        throw generateError(401, "User Not Authorized");
      }
      req.user = user;
    }
    else if (role === "doctor"){
      const doctor = await Doctor.findOne({
        _id: decoded._id,
        token: token
      });
      if (!doctor){
        throw generateError(401, "User Not Authorized");
      }
      req.user = doctor;
    }
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
};
