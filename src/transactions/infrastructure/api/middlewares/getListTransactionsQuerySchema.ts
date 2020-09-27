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
  total: Joi.number()
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
  since: Joi.date().iso(),
  until: Joi.date().iso(),
}).with('since', 'until');

export default schema;
