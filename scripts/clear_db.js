import "../config/database/mongo.js";

import { User } from "../src/models/user.js";
import { Doctor } from "../src/models/doctor.js";
import { Document } from "../src/models/document.js";
import { Acl } from "../src/models/document/acl.js";

const destroy = async () => {
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Document.deleteMany({});
  await Acl.deleteMany({});
  return "All Data Destroyed";
};


destroy().then((res) => {
  console.log(res);
  process.exit(0);
}).catch((err) => {
  console.log(err);
  process.exit(0);
});
