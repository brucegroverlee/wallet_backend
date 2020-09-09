import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(50),
  description: Joi.string()
    .min(0)
    .max(50),
});

export default schema;
