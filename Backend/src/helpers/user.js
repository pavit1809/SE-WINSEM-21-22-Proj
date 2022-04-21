import pkg from "lodash";

const {pick} = pkg;


// Internal Imports
import { User } from "../models/user.js";
import { Document } from "../models/document.js";
import { Acl } from "../models/document/acl.js";
import { Doctor } from "../models/doctor.js";
import mongoose from "mongoose";


const keysToExposeByEvent = {
  postRegister: ["_id", "name", "email", "phoneNumber"],
};

export const registerUser = async (params) => {
  const user = new User({...params});
  await user.save();
  return {userDetails: pick(user.toObject(), keysToExposeByEvent.postRegister)};
};


export const loginUser = async (params) => {
  const {email, password} = params;
  const user = await User.findByCredentials(email, password);
  const token = await user.generateToken();
  return {...(pick(user.toObject(), keysToExposeByEvent.postRegister)), token: token, role: "user"};
};


export const logoutUser = async (user) => {
  user.token = undefined;
  await user.save();
};


export const fetchAllDocuments = async (user) => {
  const {_id} = user;
  const documents = await Document.find({ownerId: _id, deleted: false});
  let displayArray = [];
  for (let i = 0;i < documents.length;i++)
  {
    const document = documents[i];
    const acl = await Acl.findOne({documentId: document._id});
    displayArray.push({
      id: document._id,
      name: document.name,
      downloadLink: document.downloadLink,
      uploadTime: new Date(document.createdAt).toLocaleString(),
      category: document.category,
      aclModifiedAt: new Date(acl.updatedAt).toLocaleString(),
    });
  }
  return displayArray;
};

export const fetchAclForDocument = async (documentId) => {
  const acl = await Acl.findOne({documentId: documentId});
  let doctorList = [];
  for (let i = 0;i < acl.doctorIds.length;i++)
  {
    const doctor = await Doctor.findById(acl.doctorIds[i]);
    doctorList.push({
      profilePictureUrl: doctor.profilePictureUrl,
      name: doctor.name,
      email: doctor.email,
      designation: "Ortho",
      id: doctor._id
    });
  }
  return doctorList;
};

export const deleteDocument = async (documentId) => {
  await Document.deleteOne({_id: mongoose.Types.ObjectId(documentId)});
};


export const deleteUserFromAcl = async (doctorIdToDelete, documentId) => {
  let acl = await Acl.findOne({documentId: documentId});
  acl.doctorIds = acl.doctorIds.filter((doctorId) => (doctorId) !== doctorIdToDelete);
  await acl.save();
};


export const fetchDoctorListToAddToAcl = async (documentId) => {
  const allDoctors = await Doctor.find({});
  const allDoctorIds = allDoctors.map((doctor) => doctor._id.toString());
  const acl = await Acl.findOne({documentId: documentId});
  const doctorIds = acl.doctorIds;
  let difference = allDoctorIds.filter(x => !doctorIds.includes(x));
  let doctorList = [];
  for (let i = 0;i < difference.length;i++)
  {
    const doctor = await Doctor.findById(mongoose.Types.ObjectId(difference[i]));
    doctorList.push({
      name: doctor.name,
      id: doctor._id
    });
  }
  return doctorList;
};


export const addUserToAcl = async (doctorId, documentId) => {
  const acl = await Acl.findOne({documentId: documentId});
  acl.doctorIds.push(doctorId);
  await acl.save();
};


export const getDocumentAccessHistory = async (documentId) => {
  const document = await Document.findById(documentId);
  let accessList = [];
  for (let i = 0;i < document.accessHistory.length;i++)
  {
    const doctor = await Doctor.findById(document.accessHistory[i].doctorId);
    accessList.push({
      name: doctor.name,
      email: doctor.email,
      profilePictureUrl: doctor.profilePictureUrl,
      accessTime: document.accessHistory[i].accessTime.toLocaleString()
    });
  }
  return accessList;
};
