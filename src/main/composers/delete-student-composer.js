import { DeleteStudentUseCase } from "../../domain/usecases";
import { PostgresHelper } from "../../infra/helpers/postgres-helper";
import { DeleteStudentRepository } from "../../infra/repositories";
import { DeleteStudentController } from "../../presentation/controllers";
import {
  RequiredFieldValidation,
  ValidationComposite,
  CpfLengthValidation,
} from "../../validations";
import { Envs } from "../config/envs";

class DeleteStudentComposer {
  static compose() {
    const postgresHelper = new PostgresHelper(Envs.POSTGRES);
    const deleteStudentRepository = new DeleteStudentRepository(postgresHelper);
    const deleteStudentUseCase = new DeleteStudentUseCase({
      deleteStudentRepository,
    });
    const deleteStudentController = new DeleteStudentController({
      deleteStudentUseCase,
      validation: DeleteStudentComposer.makeValidations(),
    });
    return deleteStudentController;
  }

  static makeValidations() {
    const validations = [];
    for (const field of ["cpf"])
      validations.push(new RequiredFieldValidation(field));
    validations.push(new CpfLengthValidation("cpf"));
    return new ValidationComposite(validations);
  }
}
export default DeleteStudentComposer;
