import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let DbUri = "mongodb://127.0.0.1:27017/SE-Project";

import {successLog, errorLog} from "../../src/lib/common_utils.js";


const dbProperties = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DbUri, dbProperties).then(()=>{
  successLog("Connection to Mongo successful");
}).catch((err) => {
  errorLog(err.message);
  process.exit();
});
