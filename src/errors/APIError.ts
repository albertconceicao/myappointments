export class APIError extends Error {
  response: Response;

  body: unknown;

  constructor(response: Response, body: unknown) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message =
      (body as { error?: string })?.error ||
      `${response.status} - ${response.statusText}`;
  }
}
