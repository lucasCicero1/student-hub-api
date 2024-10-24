import { InvalidParamError } from "../../src/presentation/errors";
import { CpfLengthValidation } from "../../src/validations";

const makeSut = () => {
  return new CpfLengthValidation("cpf");
};

describe("Cpf Length Validation", () => {
  test("Should return a InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const validateResponse = sut.validate({ cpf: "any_name" });
    expect(validateResponse).toEqual(
      new InvalidParamError("CPF must have 11 characters."),
    );
  });
});
