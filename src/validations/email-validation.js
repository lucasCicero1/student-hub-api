import { InvalidParamError } from "../presentation/errors";

export default class EmailValidation {
  #field;

  #emailValidator;

  constructor(field, emailValidator) {
    this.#field = field;
    this.#emailValidator = emailValidator;
  }

  validate(input) {
    const isValid = this.#emailValidator.isValid(input[this.#field]);
    if (!isValid) return new InvalidParamError(this.#field);
    return null;
  }
}
