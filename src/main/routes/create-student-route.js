import ExpressRouterAdapter from "../adapters/express-router-adapter";
import CreateStudentComposer from "../composers/create-student-composer";

export default (router) => {
  router.post(
    "/create/student",
    ExpressRouterAdapter.adapt(CreateStudentComposer.compose()),
  );
};
