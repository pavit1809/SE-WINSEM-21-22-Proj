const chalk = require("chalk");


const responseUtil = (status, data, message) => {
  return {
    status: status,
    data: data,
    message: message
  };
};

const errorLog = (message) => {
  console.log(chalk.red(message));
};

const successLog = (message) => {
  console.log(chalk.bgGreen.black(message));
};

const logger = (message) => {
  console.log(`[${new Date().toString()}] ${message}`);
};


// This method returns the filtered object containing only the allowedKeys
const filterObjectByAllowedKeys = (current, allowedKeys) => {
  let filtered = {};
  for (const key in current){
    if (allowedKeys.find(allowedKey => (allowedKey === key)) !== undefined){
      filtered[key] = current[key];
    }
  }
  return filtered;
};

const generateError = (status, message) => {
  let err = new Error (message);
  err.status = status;
  return err;
};

module.exports = {responseUtil, errorLog, successLog, filterObjectByAllowedKeys, generateError, logger};
