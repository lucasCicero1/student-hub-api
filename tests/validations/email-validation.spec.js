import { EmailValidation } from "../../src/validations";
import { InvalidParamError } from "../../src/presentation/errors";

const makeEmailValidator = () => {
  class EmailValidatorStub {
    isValid() {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = () => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidation("email", emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe("Email Validation", () => {
  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    sut.validate({ email: "any_email" });
    expect(isValidSpy).toHaveBeenCalledWith("any_email");
  });

  test("Should throw if EmailValidator throws", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });

  test("Should return an error if email is invalid", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const validateResponse = sut.validate({ email: "any_email" });
    expect(validateResponse).toEqual(new InvalidParamError("email"));
  });
});
