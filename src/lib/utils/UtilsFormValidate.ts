import { EMAIL_REGEX, PASSWORD_REQUIREMENTS } from '../constants/validation';

export class UtilsFormValidate {
  static required(fields: string[] = []) {
    const isAnyFieldEmpty = fields.some((field) => field.trim().length === 0);
    return {
      isValid: !isAnyFieldEmpty,
      message: isAnyFieldEmpty ? 'Please fill all the required fields.' : ''
    };
  }

  static length(
    field: string,
    fieldName: string,
    options: {
      min?: number;
      max?: number;
    } = {}
  ) {
    let isValid = true;
    if (options?.max && field.length > options.max) {
      isValid = false;
    }
    if (options?.min && field.length < options.min) {
      isValid = false;
    }
    return {
      isValid,
      message: isValid
        ? ''
        : `Field ${fieldName} must be between ${options.min} and ${options.max} characters long.`
    };
  }

  static date(date: string) {
    const parsedDate = new Date(date);
    const isValid = parsedDate instanceof Date && !isNaN(parsedDate.getTime());
    return {
      isValid,
      message: isValid
        ? ''
        : 'Date is not valid, should be in the format YYYY-MM-DD.'
    };
  }

  static email(email: string) {
    const isValid = EMAIL_REGEX.test(email);
    return {
      isValid,
      message: isValid ? '' : 'The email is not valid.'
    };
  }

  static password(password: string) {
    for (const criterion of PASSWORD_REQUIREMENTS) {
      if (!criterion.regex.test(password)) {
        return {
          isValid: false,
          message: criterion.message
        };
      }
    }
    return {
      isValid: true,
      message: ''
    };
  }
}
