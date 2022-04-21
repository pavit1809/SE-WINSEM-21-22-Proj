import express from "express";


// Internal Imports
import { errorResponse } from "../lib/common_utils.js";
import { RESPONSE_CODES as responseCodes } from "../lib/constants.js";
import { fetchValidDocuments } from "../helpers/doctor.js";
import { auth } from "../middleware/user_auth.js";


const router = new express.Router();


router.post("/documents/", auth, async (req, res) => {
  try {
    const documents = await fetchValidDocuments(req.user);
    res.status(responseCodes.SUCCESS_CODE).send(documents);
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
