import axios from "axios";
import { getQueryString } from "../utils/helpers";

// eslint-disable-next-line no-console

const headers = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
};

export const instance = axios.create();

const onFulfilled = (response: any): any => response?.data;
const onReject = (e: any): any => e;

const setHeaders = (needToken: boolean): void => {
  const token = JSON.parse(localStorage.getItem("user") as string)?.token || "";

  if (token && needToken) {
    instance.defaults.headers["x-access-token"] = token;
  } else {
    delete instance.defaults.headers["x-access-token"];
  }
};

const getBaseUrl = (
  url: string | { baseURL: string; path: string },
  params: any,
  joinQueryArrayValues: any,
  needToken: boolean
): string => {
  let path = "";

  if (typeof url === "string") {
    path = url;
  } else {
    path = url.baseURL + url.path;
  }

  path = params ? path + "?" + joinQueryArrayValues : path;

  setHeaders(needToken);

  return path;
};

class HttpClient {
  public isOkStatus = (status: number): boolean => {
    return [200, 201, 204].includes(status);
  };
  public async get<T = any>(
    url: { path: string; baseURL: string } | string,
    needToken = true,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params
      ? getQueryString(params, config?.joinQueryArrayValues)
      : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues, needToken);

    return instance
      .get<T>(path, { ...config })
      .then(onFulfilled)
      .catch(onReject);
  }

  public post<T = any, P = any>(
    url: { path: string; baseURL: string } | string,
    data?: P,
    needToken = true,
    params?: Record<string, any>,
    config?: any
  ): Promise<any> {
    const joinQueryArrayValues = params
      ? getQueryString(params, config?.joinQueryArrayValues)
      : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues, needToken);

    return instance
      .post<T>(path, data, {
        ...config,
        ...headers,
      })
      .then(onFulfilled)
      .catch(onReject);
  }

  public patch<T = any, P = any>(
    url: { path: string; baseURL: string } | string,
    data?: P,
    params?: Record<string, any>,
    config?: any,
    needToken = true
  ): Promise<any> {
    const joinQueryArrayValues = params
      ? getQueryString(params, config?.joinQueryArrayValues)
      : null;
    const path = getBaseUrl(url, params, joinQueryArrayValues, needToken);

    return instance
      .patch<T>(path, data, {
        ...config,
        ...headers,
      })
      .then(onFulfilled)
      .catch(onReject);
  }
}
export default new HttpClient();
