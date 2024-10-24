import { MissingParamError } from "../presentation/errors";

export default class RequiredFieldValidation {
  #fieldName;

  constructor(fieldName) {
    this.#fieldName = fieldName;
  }

  validate(input) {
    if (!input[this.#fieldName]) {
      return new MissingParamError(this.#fieldName);
    }
    return null;
  }
}
