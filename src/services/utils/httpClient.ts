/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIError } from '../../errors/APIError';
import delay from '../../utils/delay';

interface IRequestOptions {
  headers?: Record<string, string>;
  body?: any;
  method?: string;
}

class HttpClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(path: string, options?: IRequestOptions) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path: string, options: IRequestOptions) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path: string, options: IRequestOptions) {
    await delay(500);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let respondeBody = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      respondeBody = await response.json();
    }

    if (response.ok) {
      return respondeBody;
    }

    throw new APIError(response, respondeBody);
  }
}

export default HttpClient;
