import Joi from "joi";

const schema = Joi.object({
  categoryGroupId: Joi.string()
    .min(1)
    .max(50),
  name: Joi.string()
    .min(1)
    .max(50),
  description: Joi.string()
    .min(0)
    .max(50),
  isRecurrent: Joi.boolean(),
  budget: Joi.number()
    .min(0),
  currency: Joi.string()
    .length(3),
});

export default schema;
