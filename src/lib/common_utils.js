import chalk from "chalk";

export const errorResponse = (message) => {
  return {
    message: message,
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


export const getOtp = () => {
  let val = Math.floor(Math.random() * 1000000);
  if (val.toString().length === 5) {
    val *= 10;
  }
  return val;
};


export const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (max - min + 1)) + min;
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

export const genCode = (n = 10) => {
  n = n || 16;
  let result = "";
  while (n--){
    result += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return result;
};
