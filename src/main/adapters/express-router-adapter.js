class ExpressRouterAdapter {
  static adapt(controller) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
      };
      const httpResponse = await controller.handle(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}

export default ExpressRouterAdapter;
