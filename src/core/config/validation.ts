import * as Joi from "joi";

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.required(),
  DB_USERNAME: Joi.string().required(),

  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),

  OPENAI_API_KEY: Joi.string().required(),
}).unknown();

export const validateSchema = () => {
  const { error } = validationSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};
