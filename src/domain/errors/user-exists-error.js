export default class UserExistsError extends Error {
  statusCode = 409;

  constructor(cpf) {
    super(`User with cpf: ${cpf} already exists!`);
    this.name = "UserExistsError";
  }
}
