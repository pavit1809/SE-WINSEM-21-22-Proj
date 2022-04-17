import process from "process";

// Internal Imports
import {logger} from "../../src/lib/common_utils.js";

process.on("unhandledRejection", (reason, promise) => {
  logger(`Unhandled Rejection at ${promise} due to ${reason}`);
});
