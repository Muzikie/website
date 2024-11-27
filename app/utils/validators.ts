import {CapitalizeKey} from './formatters';
import {ValidatorSchema, ValidationResult} from './types';

export const validateForm = (
  schema: ValidatorSchema,
  data: Record<string, unknown>,
): ValidationResult => {
  // Loop through each key in the schema
  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      const validator = schema[key];
      const value = data[key];

      // Skip validation if the key is not in the data object
      if (!data.hasOwnProperty(key)) {
        continue;
      }

      let isValid = false;

      // Check if the validator is a function
      if (typeof validator === 'function') {
        isValid = validator(value);
      }
      // Check if the validator is a regex
      else if (validator instanceof RegExp) {
        if (typeof value === 'string') {
          isValid = validator.test(value);
        } else {
          isValid = false;
        }
      }

      // If the value is invalid, return the first encountered error
      if (!isValid) {
        return {
          isValid: false,
          message: `Validation failed for key: "${CapitalizeKey(key)}".`,
        };
      }
    }
  }

  // If no errors, return isValid as true
  return {
    isValid: true,
    message: '',
  };
};
