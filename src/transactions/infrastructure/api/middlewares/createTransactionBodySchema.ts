import Joi from "joi";

const schema = Joi.object({
  categoryId: Joi.string()
    .min(1)
    .max(50)
    .required(),
  accountId: Joi.string()
    .min(1)
    .max(50)
    .required(),
  description: Joi.string()
    .min(0)
    .max(250)
    .required(),
  total: Joi.number()
    .min(0)
    .required(),
  currency: Joi.string()
    .length(3)
    .required(),
});

export default schema;
