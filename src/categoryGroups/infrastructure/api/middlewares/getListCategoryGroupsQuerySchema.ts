import Joi from "joi";

const schema = Joi.object({
  type: Joi.string()
    .valid('income','expenses'),
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
