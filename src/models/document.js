import mongoose from "mongoose";
import { Acl } from "./document/acl.js";

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  downloadLink: {
    type: String,
  },
  aclId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  timestamps: true
});

DocumentSchema.post("save", async function(document, next) {
  const aclObject = {
    documentId: document._id,
  };
  const acl = new Acl(aclObject);
  await acl.save();
  next();
});


const Document = mongoose.model("Document", DocumentSchema);

export {Document};
