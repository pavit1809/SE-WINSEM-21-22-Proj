import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 5000;


// Internal Imports
import {errorResponse, successLog} from "./src/lib/common_utils.js";
import {RESPONSE_CODES as responseCodes} from "./src/lib/constants.js";
import { registerUser, loginUser, logoutUser } from "./src/helpers/user.js";
import { registerDoctor, loginDoctor, logoutDoctor } from "./src/helpers/doctor.js";
import { auth } from "./src/middleware/user_auth.js";


// Router Imports
import {router as documentRouter} from "./src/routers/document.js";
import {router as userRouter} from "./src/routers/user.js";
import {router as otpRouter} from "./src/routers/otp.js";
import {router as doctorRouter} from "./src/routers/doctor.js";


// Server Configs
import "./config/database/mongo.js";
import "./config/listeners/base.js";
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression(1));
app.use(morgan("dev"));


// loading routers
app.use("/document", documentRouter);
app.use("/doctor", doctorRouter);
app.use("/user", userRouter);
app.use("/otp", otpRouter);


app.get("/", async (req, res) => {
  try {
    res.send("Api is working fine");
  } catch (err){
    res.status(responseCodes.INTERNAL_SERVER_ERROR_CODE).send(errorResponse(err.message));
  }
});


app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const {role} = req.body;
    let userDetails = {};
    if (role === "user") {
      userDetails = await registerUser(req.body);
    } else {
      userDetails = await registerDoctor(req.body);
    }
    res.status(responseCodes.CREATED_CODE).send(userDetails);
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


app.post("/login", async (req, res) => {
  try {
    const {role} = req.body;
    let userDetails = {};
    if (role === "user") {
      userDetails = await loginUser(req.body);
    } else {
      userDetails = await loginDoctor(req.body);
    }
    res.status(responseCodes.SUCCESS_CODE).send(userDetails);
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});


app.post("/logout", auth, async (req, res) => {
  try {
    const {role} = req.body;
    if (role === "user") {
      await logoutUser(req.user);
    } else {
      await logoutDoctor(req.user);
    }
    res.status(responseCodes.SUCCESS_CODE).send({});
  } catch (err){
    console.log(err);
    const {status = responseCodes.INTERNAL_SERVER_ERROR_CODE, message = "Internal Server Occured"} = err;
    res.status(status).send(errorResponse(message));
  }
});

app.listen(PORT, () => {
  successLog(`Server is up and running at PORT: ${PORT}`);
});
