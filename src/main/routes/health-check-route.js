export default (router) => {
  router.get("/health", (req, res, next) => {
    res.status(200).send("OK");
    next();
  });
};
