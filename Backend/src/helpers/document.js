import {v4} from "uuid";


import {generateError} from "../lib/common_utils.js";
import { bucket } from "../../config/database/firebase.js";
import { Document } from "../models/document.js";
import mongoose from "mongoose";


export const uploadFile = async (file, user, category) => {
  if (file === undefined){
    throw generateError(400, "File not present");
  }
  let fileExt = file.originalname.split(".")[file.originalname.split(".").length - 1];
  const fileBuffer = new Uint8Array(file.buffer);
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() +  10005 * 60 * 1000
  };

  const uploadedFile = bucket.file(`UserFiles/${v4()}.${fileExt}`);
  await uploadedFile.save(fileBuffer, {
    resumable: false,
    metadata: {contentType: file.mimeType},
  });

  // Generating a random id for case if document is uploaded during registration
  const url = await uploadedFile.getSignedUrl(options);
  const document = new Document({
    name: file.originalname,
    downloadLink: url[0],
    ownerId: user._id || mongoose.Types.ObjectId(),
    category: category,
  });
  await document.save();
  return document;
};



export const createHistory = async (documentId, currentUser) => {
  const document = await Document.findById(documentId);
  document.accessHistory.push({
    doctorId: currentUser._id,
    accessTime: Date.now()
  });
  await document.save();
};
