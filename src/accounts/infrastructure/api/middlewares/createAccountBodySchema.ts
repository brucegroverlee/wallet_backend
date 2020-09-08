import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  total: Joi.number()
    .min(0)
    .required(),
  currency: Joi.string()
    .length(3)
    .required(),
});

export default schema;
