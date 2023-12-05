import Joi from "joi";

export default Joi.object({
  email: Joi.string().required().messages({
    "any.required": "email is a required field",
    "string.empty": "email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "password is a required field",
    "string.empty": "password is required",
  }),
});
