import * as Joi from "joi";

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().required(),

  OPENAI_API_KEY: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN_DAYS: Joi.number().required(),
}).unknown();

export const validateSchema = () => {
  const { error } = validationSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};
