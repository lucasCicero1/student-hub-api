import { InvalidParamError } from "../presentation/errors";

export default class EmailValidation {
  #field;

  constructor(field) {
    this.#field = field;
  }

  validate(input) {
    const isValid = input[this.#field].length === 11;
    if (!isValid)
      return new InvalidParamError(
        `${this.#field.toUpperCase()} must have 11 characters.`,
      );
    return null;
  }
}
