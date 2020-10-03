import Joi from "joi";

const schema = Joi.object({
  categoryId: Joi.string()
    .min(1)
    .max(50),
  accountId: Joi.string()
    .min(1)
    .max(50),
  description: Joi.string()
    .min(0)
    .max(250),
  total: Joi.number(),
  currency: Joi.string()
    .length(3),
});

export default schema;
