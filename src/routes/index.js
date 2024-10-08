import { Router } from "express";

import health from "./health-route";

const routes = new Router();

health(routes);

export default routes;
