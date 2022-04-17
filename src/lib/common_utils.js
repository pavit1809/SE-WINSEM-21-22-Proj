import chalk from "chalk";

export const responseUtil = (status, data, message) => {
  return {
    status: status,
    data: data,
    message: message
  };
};

export const errorLog = (message) => {
  console.log(chalk.red(message));
};

export const successLog = (message) => {
  console.log(chalk.bgGreen.black(message));
};

export const logger = (message) => {
  console.log(`[${new Date().toString()}] ${message}`);
};


// This method returns the filtered object containing only the allowedKeys
export const filterObjectByAllowedKeys = (current, allowedKeys) => {
  let filtered = {};
  for (const key in current){
    if (allowedKeys.find(allowedKey => (allowedKey === key)) !== undefined){
      filtered[key] = current[key];
    }
  }
  return filtered;
};

export const generateError = (status, message) => {
  let err = new Error (message);
  err.status = status;
  return err;
};
