import Joi from "joi";

const schema = Joi.object({
  categoryGroupId: Joi.string()
    .min(2)
    .max(50),
  name: Joi.string()
    .min(2)
    .max(50),
  budget: Joi.number()
    .min(0),
  currency: Joi.string()
    .length(3),
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),
  perPage: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
});

export default schema;
