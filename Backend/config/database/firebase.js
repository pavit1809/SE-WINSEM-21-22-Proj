import {Storage} from "@google-cloud/storage";
import path from "path";

import { dirname} from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = new Storage({
  projectId: process.env.FIREBASE_PROJECT_ID,
  keyFilename: path.resolve(__dirname, "./se-project-2021-22-winsem-firebase-adminsdk-9bpso-8b5dfa4ab2.json")
});


const bucket = storage.bucket(process.env.STORAGE_BUCKET);

export {bucket};
