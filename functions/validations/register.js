const Joi = require("joi");

// validate functions
const registerValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref("password"),
    position: Joi.string().required(),
    permission: Joi.string().required(),
    imageUrl: Joi.string(),
  }).with("password", "repeat_password");

  const validation_result = schema.validate(data);
  return validation_result;
};


const usernameValidation = (data) => {
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
    });
    const validation_result = schema.validate(data);
    return validation_result;
  };
  
  const passwordValidation = (data) => {
    const schema = Joi.object({
      password: Joi.string().min(8).required(),
    });
    const validation_result = schema.validate(data);
    return validation_result;
  };

module.exports = {
    registerValidation : registerValidation,
    usernameValidation : usernameValidation,
    passwordValidation : passwordValidation
}