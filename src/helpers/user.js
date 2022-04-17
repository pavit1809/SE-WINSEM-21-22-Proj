import { pick } from "lodash";


// Internal Imports
import { User } from "../models/user.js";


const keysToExposeByEvent = {
  postRegister: ["_id", "name", "email", "phoneNumber"],
};

export const registerUser = async (params) => {
  const user = new User({...params});
  await user.save();
  return {userDetails: pick(user.toObject(), keysToExposeByEvent.postRegister)};
};
