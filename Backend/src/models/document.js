import mongoose from "mongoose";
import { Acl } from "./document/acl.js";

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  aclId: {
    type: String,
  },
  ownerId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  accessHistory: {
    type: [{
      doctorId: {
        type: String,
        required: true
      },
      accessTime: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  }
}, {
  timestamps: true
});

DocumentSchema.methods.acl = async function(){
  const acl = await Acl.findOne({documentId: this._id});
  return acl;
};


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
