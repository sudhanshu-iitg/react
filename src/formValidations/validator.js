import validator from "validator";

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    return "Please enter a valid email";
  } else return "";
};

export const validateEmptyField = (field) => {
  if (validator.isEmpty(field)) {
    return "This field cannot be empty";
  } else return "";
};

export const validateMobileNumber = (mobile) => {
  if (
    !validator.isNumeric(mobile) &&
    !validator.isByteLength(mobile, [{ min: 10, max: 10 }])
  ) {
    return "Please enter a valid mobile number";
  } else return "";
};

export const validatePassword = (password) => {
  if (
    !validator.isByteLength(password, [{ min: 8, max: 20 }]) &&
    !validator.isAlphanumeric(password)
  ) {
    return "Password character limit should be between 8-20 and should be alphanumeric";
  } else return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!validator.equals(password, confirmPassword)) {
    return "Passwords do not match";
  } else return "";
};
