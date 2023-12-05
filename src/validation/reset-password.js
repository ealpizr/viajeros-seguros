import Joi from "joi";

export default Joi.object({
  oldPassword: Joi.string().required().messages({
    "any.required": "oldPassword is a required field",
    "string.empty": "oldPassword is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&,\\.])[A-Za-z\\d@$!%*#?&,\\.]+$"
      )
    )
    .required()
    .messages({
      "any.required": "password is a required field",
      "string.empty": "password is required",
      "string.min": "password must be at least 8 characters long",
      "string.pattern.base":
        "password must contain at least one letter, one number and one special character",
    }),
});
