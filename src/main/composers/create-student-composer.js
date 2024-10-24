import { CreateStudentUseCase } from "../../domain/usecases";
import { PostgresHelper } from "../../infra/helpers/postgres-helper";
import {
  CreateStudentRepository,
  ListStudentsRepository,
} from "../../infra/repositories";
import { CreateStudentController } from "../../presentation/controllers";
import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from "../../validations";
import { EmailValidatorAdapter } from "../../infra/validators";
import { Envs } from "../config/envs";

class CreateStudentComposer {
  static compose() {
    const postgresHelper = new PostgresHelper(Envs.POSTGRES);
    const createStudentRepository = new CreateStudentRepository(postgresHelper);
    const listStudentsRepository = new ListStudentsRepository(postgresHelper);
    const createStudentUseCase = new CreateStudentUseCase({
      createStudentRepository,
      listStudentsRepository,
    });
    const createStudentController = new CreateStudentController({
      createStudentUseCase,
      validation: CreateStudentComposer.makeValidations(),
    });
    return createStudentController;
  }

  static makeValidations() {
    const validations = [];
    for (const field of ["name", "email", "cpf"])
      validations.push(new RequiredFieldValidation(field));
    validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
    return new ValidationComposite(validations);
  }
}
export default CreateStudentComposer;
