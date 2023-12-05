import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().min(8).messages({
    "any.required": "name is a required field",
    "string.empty": "name is required",
    "string.min": "name must be at least 8 characters long",
  }),
  address: Joi.string().required().min(8).messages({
    "any.required": "address is a required field",
    "string.empty": "address is required",
    "string.min": "address must be at least 8 characters long",
  }),
  categoryId: Joi.string().required().messages({
    "any.required": "categoryId is a required field",
    "string.empty": "categoryId is required",
  }),
  phone: Joi.string()
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
  price: Joi.number().min(1).required().messages({
    "any.required": "price is a required field",
    "number.base": "price must be a number",
    "number.min": "price must be greater than or equal to 1",
  }),
  description: Joi.string().min(10).required().messages({
    "any.required": "description is a required field",
    "string.empty": "description is required",
    "string.min": "description must be at least 10 characters long",
  }),
  images: Joi.any(),
});
