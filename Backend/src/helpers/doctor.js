import pkg from "lodash";
import { randAvatar } from "@ngneat/falso";


import { Doctor } from "../models/doctor.js";
import { genCode } from "../lib/common_utils.js";
import { Document } from "../models/document.js";
import { Acl } from "../models/document/acl.js";
import { User } from "../models/user.js";

const {pick} = pkg;

const keysToExposeByEvent = {
  postRegister: ["_id", "name", "email", "phoneNumber", "uniqueKey"],
};


export const registerDoctor = async (params) => {
  const doctor = new Doctor({...params, uniqueKey: genCode(10), profilePictureUrl: randAvatar()});
  await doctor.save();
  return {doctorDetails: pick(doctor.toObject(), keysToExposeByEvent.postRegister)};
};


export const loginDoctor = async (params) => {
  const {email, password} = params;
  const doctor = await Doctor.findByCredentials(email, password);
  const token = await doctor.generateToken();
  return {...(pick(doctor.toObject(), keysToExposeByEvent.postRegister)), token: token, role: "doctor"};
};


export const logoutDoctor = async (doctor) => {
  doctor.token = undefined;
  await doctor.save();
};


export const fetchValidDocuments = async (user) => {
  const {_id: userId} = user;
  const documents = await Document.find({});
  let validDocuments = [];
  for (let i = 0;i < documents.length;i++)
  {
    const document = documents[i];
    const acl = Acl.find({documentId: documents[i]._id, doctorIds: userId});
    if (acl)
    {
      const clientUser = await User.findById(document.ownerId);
      validDocuments.push({
        id: document._id,
        name: document.name,
        downloadLink: document.downloadLink,
        category: document.category,
        ownerName: clientUser.name,
        ownerEmail: clientUser.email,
      });
    }
  }
  return validDocuments;
};
