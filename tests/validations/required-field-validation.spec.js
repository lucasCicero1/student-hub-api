import { MissingParamError } from "../../src/presentation/errors";
import { RequiredFieldValidation } from "../../src/validations";

const makeSut = () => {
  return new RequiredFieldValidation("email");
};

describe("RequiredField Validation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const validateResponse = sut.validate({ name: "any_name" });
    expect(validateResponse).toEqual(new MissingParamError("email"));
  });

  test("Should return nothing if validation pass", () => {
    const sut = makeSut();
    const validateResponse = sut.validate({ email: "any_email" });
    expect(validateResponse).toBeFalsy();
  });
});
