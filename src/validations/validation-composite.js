export default class ValidationComposite {
  #validations;

  constructor(validations) {
    this.#validations = validations;
  }

  validate(input) {
    for (const validation of this.#validations) {
      const error = validation.validate(input);
      if (error) return error;
    }
    return null;
  }
}
