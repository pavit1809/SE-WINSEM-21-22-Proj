import express from "express";


// Internal Imports
import { errorResponse } from "../lib/common_utils.js";
import {RESPONSE_CODES as responseCodes} from "../lib/constants.js";
import {
  fetchAllDocuments,
  fetchAclForDocument,
  deleteDocument,
  deleteUserFromAcl,
  fetchDoctorListToAddToAcl,
  addUserToAcl,
  getDocumentAccessHistory
} from "../helpers/user.js";
import { auth } from "../middleware/user_auth.js";


const router = new express.Router();


router.post("/documents", auth, async (req, res) => {
  try {
    const documentList = await fetchAllDocuments(req.user);
    res.status(responseCodes.SUCCESS_CODE).send(documentList);
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/document/acl", auth, async (req, res) => {
  try {
    const {id: documentId} = req.body;
    const aclList = await fetchAclForDocument(documentId);
    res.status(responseCodes.SUCCESS_CODE).send(aclList);
  } catch (err) {
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/document/delete", auth, async (req, res) => {
  try {
    const {id: documentId} = req.body;
    await deleteDocument(documentId);
    res.status(responseCodes.SUCCESS_CODE).send({});
  } catch (err) {
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});

router.post("/document/acl/delete-user", auth, async (req, res) => {
  try {
    const {id: doctorId, documentId} = req.body;
    await deleteUserFromAcl(doctorId, documentId);
    res.status(responseCodes.SUCCESS_CODE).send({});
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/document/acl/add-user-requisites", auth, async (req, res) => {
  try {
    const {documentId} = req.body;
    const doctorList = await fetchDoctorListToAddToAcl(documentId);
    res.status(responseCodes.SUCCESS_CODE).send(doctorList);
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/document/acl/add-user", auth, async (req, res) => {
  try {
    const {id: doctorId, documentId} = req.body;
    await addUserToAcl(doctorId, documentId);
    res.status(responseCodes.SUCCESS_CODE).send({});
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


router.post("/document/history", auth, async (req, res) => {
  try {
    const {id: documentId} = req.body;
    const history = await getDocumentAccessHistory(documentId);
    res.status(responseCodes.SUCCESS_CODE).send(history);
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


export {router};
