const Joi = require("joi");

const loginValidation = (data) => {
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
      password: Joi.string().min(8).required(),
    });
    const validation_result = schema.validate(data);
    return validation_result;
  };

  module.exports = {
    loginValidation : loginValidation
  }