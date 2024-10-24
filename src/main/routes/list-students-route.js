import ExpressRouterAdapter from "../adapters/express-router-adapter";
import ListStudentsComposer from "../composers/list-students-composer";

export default (router) => {
  router.get(
    "/list/students",
    ExpressRouterAdapter.adapt(ListStudentsComposer.compose()),
  );
};
