import Joi from "joi";

const schema = Joi.object({
  categoryGroupId: Joi.string()
    .min(1)
    .max(50)
    .required(),
  name: Joi.string()
    .min(1)
    .max(50)
    .required(),
  description: Joi.string()
    .min(0)
    .max(50)
    .required(),
  isRecurrent: Joi.boolean()
    .required(),
  budget: Joi.number()
    .min(0)
    .required(),
  currency: Joi.string()
    .length(3)
    .required(),
});

export default schema;
