import Joi from "joi";

export default Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages({
      "any.required": "firstName is a required field",
      "string.empty": "firstName is required",
      "string.min": "firstName must be at least 3 characters long",
      "string.max":
        "firstName must be less than or equal to 30 characters long",
      "string.pattern.base": "firstName must contain only letters",
    }),
  firstLastName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z ]+$"))
    .required()
    .messages({
      "any.required": "firstLastName is a required field",
      "string.empty": "firstLastName is required",
      "string.min": "firstLastName must be at least 3 characters long",
      "string.max":
        "firstLastName must be less than or equal to 30 characters long",
      "string.pattern.base": "firstLastName must contain only letters",
    }),
  secondLastName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z ]+$"))
    .required()
    .messages({
      "any.required": "secondLastName is a required field",
      "string.empty": "secondLastName is required",
      "string.min": "secondLastName must be at least 3 characters long",
      "string.max":
        "secondLastName must be less than or equal to 30 characters long",
      "string.pattern.base": "secondLastName must contain only letters",
    }),
  dateOfBirth: Joi.date().less("now").required().messages({
    "any.required": "dateOfBirth is a required field",
    "date.base": "dateOfBirth must be a valid date",
    "date.less": "dateOfBirth must be less than or equal to today",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "email is a required field",
    "string.empty": "email is required",
    "string.email": "email must be a valid email",
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
  identification: Joi.string()
    .min(9)
    .max(12)
    .pattern(new RegExp("^[0-9]+$"))
    .required()
    .messages({
      "any.required": "identification is a required field",
      "string.empty": "identification is required",
      "string.pattern.base": "identification must contain only numbers",
      "string.min": "identification must be at least 9 characters long",
      "string.max":
        "identification must be less than or equal to 12 characters long",
    }),
  phoneNumber: Joi.string()
    .min(8)
    .max(12)
    .pattern(new RegExp("^[0-9]+$"))
    .required()
    .messages({
      "any.required": "phoneNumber is a required field",
      "string.empty": "phoneNumber is required",
      "string.pattern.base": "phoneNumber must contain only numbers",
      "string.min": "phoneNumber must be at least 8 characters long",
      "string.max":
        "phoneNumber must be less than or equal to 12 characters long",
    }),
  photo: Joi.any(),
});
