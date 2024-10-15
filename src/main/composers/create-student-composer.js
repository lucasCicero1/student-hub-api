import { CreateStudentUseCase } from "../../domain/usecases";
import { PostgresHelper } from "../../infra/helpers/postgres-helper";
import { CreateStudentRepository } from "../../infra/repositories";
import { CreateStudentController } from "../../presentation/controllers";
import { Envs } from "../config/envs";

class CreateProtocolsRouterComposer {
  static compose() {
    const postgresHelper = new PostgresHelper(Envs.POSTGRES);
    const createStudentRepository = new CreateStudentRepository(postgresHelper);
    const createStudentUseCase = new CreateStudentUseCase({
      createStudentRepository,
    });
    const createStudentController = new CreateStudentController({
      createStudentUseCase,
    });
    return createStudentController;
  }
}
export default CreateProtocolsRouterComposer;
