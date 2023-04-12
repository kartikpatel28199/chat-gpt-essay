import { validate } from "class-validator";

export const validateDto = async (object: object) => {
  const errors = await validate(object);
  if (errors.length > 0) {
    const constraints = {};
    errors.forEach((error) => {
      const propertyName = error.property;
      const errorConstraints = Object.values(error.constraints);
      constraints[propertyName] = errorConstraints;
    });
    return constraints;
  }
};
