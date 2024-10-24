export default class EmailValidation {
  #field;

  #emailValidator;

  constructor(field, emailValidator) {
    this.#field = field;
    this.#emailValidator = emailValidator;
  }

  validate(input) {
    this.#emailValidator.isValid(input[this.#field]);
  }
}
