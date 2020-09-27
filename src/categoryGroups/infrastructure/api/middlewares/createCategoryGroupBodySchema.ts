import Joi from "joi";

const schema = Joi.object({
  type: Joi.string()
    .valid('income','expenses')
    .required(),
  name: Joi.string()
    .min(1)
    .max(50)
    .required(),
  description: Joi.string()
    .min(0)
    .max(50)
    .required(),
});

export default schema;
