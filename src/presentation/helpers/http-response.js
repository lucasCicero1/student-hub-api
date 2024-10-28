import { ServerError } from "../errors";

class HttpResponse {
  static ok(body) {
    return {
      statusCode: 200,
      body,
    };
  }

  static created(body) {
    return {
      statusCode: 201,
      body,
    };
  }

  static updated(body) {
    return {
      statusCode: 204,
      body,
    };
  }

  static conflict(error) {
    return {
      statusCode: 409,
      body: {
        error,
      },
    };
  }

  static noContent() {
    return {
      statusCode: 204,
    };
  }

  static notFound(error) {
    return {
      statusCode: 404,
      body: {
        error,
      },
    };
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error,
      },
    };
  }

  static serverError(error) {
    return {
      statusCode: 500,
      body: {
        error: new ServerError(error),
      },
    };
  }
}

export default HttpResponse;
