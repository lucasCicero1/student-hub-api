import { UpdateStudentUseCase } from "../../domain/usecases";
import { PostgresHelper } from "../../infra/helpers/postgres-helper";
import { UpdateStudentRepository } from "../../infra/repositories";
import { UpdateStudentController } from "../../presentation/controllers";
import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
  CpfLengthValidation,
} from "../../validations";
import { EmailValidatorAdapter } from "../../infra/validators";
import { Envs } from "../config/envs";

class UpdateStudentComposer {
  static compose() {
    const postgresHelper = new PostgresHelper(Envs.POSTGRES);
    const updateStudentRepository = new UpdateStudentRepository(postgresHelper);
    const updateStudentUseCase = new UpdateStudentUseCase({
      updateStudentRepository,
    });
    const updateStudentController = new UpdateStudentController({
      updateStudentUseCase,
      validation: UpdateStudentComposer.makeValidations(),
    });
    return updateStudentController;
  }

  static makeValidations() {
    const validations = [];
    for (const field of ["name", "email", "cpf"])
      validations.push(new RequiredFieldValidation(field));
    validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
    validations.push(new CpfLengthValidation("cpf"));
    return new ValidationComposite(validations);
  }
}
export default UpdateStudentComposer;
