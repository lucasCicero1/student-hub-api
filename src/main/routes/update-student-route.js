import ExpressRouterAdapter from "../adapters/express-router-adapter";
import UpdateStudentComposer from "../composers/update-student-composer";

export default (router) => {
  router.patch(
    "/update/student",
    ExpressRouterAdapter.adapt(UpdateStudentComposer.compose()),
  );
};
