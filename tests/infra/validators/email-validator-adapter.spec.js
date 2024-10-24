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
});
