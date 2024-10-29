import ExpressRouterAdapter from "../adapters/express-router-adapter";
import DeleteStudentComposer from "../composers/delete-student-composer";

export default (router) => {
  router.delete(
    "/delete/student",
    ExpressRouterAdapter.adapt(DeleteStudentComposer.compose()),
  );
};
