import express from "express";


// Internal Imports
import { errorResponse } from "../lib/common_utils.js";
import {RESPONSE_CODES} from "../lib/constants.js";
import { registerUser } from "../helpers/user.js";


const router = new express.Router();


router.post("/signup", async (req, res) => {
  try {
    const userDetails = await registerUser(req.body);
    res.status(RESPONSE_CODES.CREATED_CODE).send(userDetails);
  } catch (err){
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
