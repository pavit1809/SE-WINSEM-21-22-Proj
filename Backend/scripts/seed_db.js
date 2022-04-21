import "../config/database/mongo.js";
import {randFullName, randEmail, randPhoneNumber, randAvatar} from "@ngneat/falso";
import mongoose from "mongoose";
import fs from "fs";
import path, { dirname} from "path";
import { fileURLToPath } from "url";
import {v4} from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { User } from "../src/models/user.js";
import { Doctor } from "../src/models/doctor.js";
import { Document } from "../src/models/document.js";
import { logger, genCode, getRandomNumber } from "../src/lib/common_utils.js";
import { bucket } from "../config/database/firebase.js";
import { Acl } from "../src/models/document/acl.js";


const generateTestData = async () => {

  let userCount = 1;
  while (userCount--) {
    const user = new User({
      name: randFullName(),
      email: "admin@gmail.com",
      phoneNumber: randPhoneNumber({countryCode: "IN"}),
      password: "1234"
    });
    await user.save();
    logger(`Generated user with id: ${user._id}`);
  }

  let doctorCount = 100;
  const designations = ["Ortho", "Bone Specialist", "Cardi-vascular", "Neuro Surgeon", "ENT", "General Medicine"];
  while (doctorCount--) {
    const doctor = new Doctor({
      name: randFullName(),
      email: randEmail(),
      phoneNumber: randPhoneNumber({countryCode: "IN"}),
      password: "1234",
      certifications: [mongoose.Types.ObjectId()],
      uniqueKey: genCode(10),
      profilePictureUrl: randAvatar(),
      designation: designations[getRandomNumber(1, 5)]
    });
    await doctor.save();
    logger(`Generated doctor with id: ${doctor._id}`);
  }

  const documents = fs.readdirSync(path.join(__dirname, "../public"));
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 10005 * 60 * 1000, // 10005 minutes
  };
  const documentTypes = ["General Document", "MRI report", "CT Scan", "Prescription Letter", "XRAY SCAN", "Medical Clearance Certificate"];
  for (let i = 0;i < documents.length;i++)
  {
    const owner = await User.findOne({email: "admin@gmail.com"});
    const document = documents[i];
    const meta = fs.readFileSync(path.join(__dirname, `../public/${document}`));
    const buffer = new Uint8Array(meta);
    const file1 = bucket.file(`UserFiles/${v4()}.pdf`);
    await file1.save(buffer, {resumable: false, metadata: {contentType: "application/pdf"}});
    const imgUrl = await file1.getSignedUrl(options);
    const document1 = new Document({
      name: document,
      downloadLink: imgUrl[0],
      ownerId: owner._id,
      category: documentTypes[getRandomNumber(0, 5)],
    });
    await document1.save();
    logger(`Generated document with id: ${document1._id}`);
  }

  const allDocuments = await Document.find({});
  const doctors = await Doctor.find({});
  for (let i = 0;i < allDocuments.length;i++)
  {
    const document = allDocuments[i];
    const acl = await Acl.findOne({documentId: document._id.toString()});
    let doctorsToInsert = 10;
    while (doctorsToInsert--)
    {
      const doctor = doctors[getRandomNumber(0, 99)];
      acl.doctorIds.push(doctor._id);
    }
    await acl.save();
    logger(`Acl with id: ${acl._id} updated with 10 doctors`);
  }

  return "Data Generated Successfully";
};


generateTestData().then((res) => {
  console.log(res);
  process.exit(0);
}).catch((err)=> {
  console.log(err);
  process.exit(0);
});
