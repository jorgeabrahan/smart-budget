import { EMAIL_REGEX, PASSWORD_REQUIREMENTS } from '../constants/validation'

export class UtilsFormValidate {
  static required(fields: string[] = []) {
    const isAnyFieldEmpty = fields.some((field) => field.trim().length === 0)
    return {
      isValid: !isAnyFieldEmpty,
      message: isAnyFieldEmpty
        ? 'Por favor, llena todos los campos obligatorios.'
        : ''
    }
  }

  static email(email: string) {
    const isValid = EMAIL_REGEX.test(email)
    return {
      isValid,
      message: isValid ? '' : 'El formato del correo electrónico no es válido.'
    }
  }

  static password(password: string) {
    for (const criterion of PASSWORD_REQUIREMENTS) {
      if (!criterion.regex.test(password)) {
        return {
          isValid: false,
          message: criterion.message
        }
      }
    }
    return {
      isValid: true,
      message: ''
    }
  }
}
