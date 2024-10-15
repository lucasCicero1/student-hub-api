import { cors, jsonParse, contentType } from "../middlewares";

export default (app) => {
  app.disable("x-powered-by");
  app.use(cors);
  app.use(jsonParse);
  app.use(contentType);
};
