import express from "express";


const router = new express.Router();


import { auth } from "../middleware/user_auth.js";
import { uploadFile, createHistory } from "../helpers/document.js";
import { upload } from "../lib/multer.js";
import { RESPONSE_CODES } from "../lib/constants.js";
import { errorResponse } from "../lib/common_utils.js";


router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const {_id: documentId, downloadLink, name: documentName} = await uploadFile(req.file, req.user || {}, "General File");
    res.status(201).send({downloadLink, documentId, documentName});
  } catch (err) {
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/upload-mfile", upload.single("file"), auth, async (req, res) => {
  try {
    const {category = "General File"} = req.body;
    const {_id: documentId, downloadLink, name: documentName} = await uploadFile(req.file, req.user || {}, category);
    res.status(201).send({downloadLink, documentId, documentName});
  } catch (err) {
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/fetch", auth, async (req, res) => {
  try {
    const {id: documentId} = req.body;
    await createHistory(documentId, req.user);
    res.status(201).send({});
  } catch (err){
    const {status = RESPONSE_CODES.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
