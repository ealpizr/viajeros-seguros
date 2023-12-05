import Joi from "joi";

export default Joi.object({
  email: Joi.string().required().messages({
    "any.required": "email is a required field",
    "string.empty": "email is required",
  }),
});
