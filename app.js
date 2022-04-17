import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 5000;


// Internal Imports
import {responseUtil, successLog} from "./src/lib/common_utils.js";
import {RESPONSE_CODES as responseCodes} from "./src/lib/constants.js";


// Router Imports


// Server Configs
import "./config/database/mongo.js";
import "./config/listeners/base.js";
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression(1));
app.use(morgan("dev"));
// loading routers


app.get("/", async (req, res) => {
  try {
    res.send(responseUtil(responseCodes.SUCCESS_CODE, null, "Api is working fine"));
  } catch (err){
    res.send(responseUtil(responseCodes.INTERNAL_SERVER_ERROR_CODE, null, err.message));
  }
});


app.listen(PORT, () => {
  successLog(`Server is up and running at PORT: ${PORT}`);
});
