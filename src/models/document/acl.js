import mongoose from "mongoose";


const AclSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  doctorIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
}, {
  timestamps: true
});


const Acl = mongoose.model("Acl", AclSchema);

export {Acl};
