import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50),
  total: Joi.number()
    .min(0),
  currency: Joi.string()
    .length(3),
});

export default schema;
