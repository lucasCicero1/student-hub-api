export default (routes) => {
  routes.get("/health", (_, res) => res.status(200).send("OK"));
};
