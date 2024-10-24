import validator from "validator";
import { EmailValidatorAdapter } from "../../../src/infra/validators";

jest.mock("validator", () => ({
  isEmail() {
    return true;
  },
}));

const makeSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidator Adapter", () => {
  test("Should return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("Should return true if validator returns true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("valid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("Should call validator with correct email", () => {
    const sut = makeSut();
    const validatorSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("valid_email@mail.com");
    expect(validatorSpy).toHaveBeenCalledWith("valid_email@mail.com");
  });
});
