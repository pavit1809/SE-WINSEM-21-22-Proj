const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let DbUri = "mongodb://127.0.0.1:27017/SE-Project";

const commonUtils = require("../../src/lib/common_utils");

const dbProperties = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DbUri, dbProperties).then(()=>{
  commonUtils.successLog("Connection to Mongo successful");
}).catch((err) => {
  commonUtils.errorLog(err.message);
  process.exit();
});
