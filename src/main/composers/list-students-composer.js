import { ListStudentsUseCase } from "../../domain/usecases";
import { PostgresHelper } from "../../infra/helpers/postgres-helper";
import { ListStudentsRepository } from "../../infra/repositories";
import { ListStudentsController } from "../../presentation/controllers";
import { Envs } from "../config/envs";

class ListStudentsComposer {
  static compose() {
    const postgresHelper = new PostgresHelper(Envs.POSTGRES);
    const listStudentsRepository = new ListStudentsRepository(postgresHelper);
    const listStudentsUseCase = new ListStudentsUseCase({
      listStudentsRepository,
    });
    const listStudentsController = new ListStudentsController({
      listStudentsUseCase,
    });
    return listStudentsController;
  }
}
export default ListStudentsComposer;
