import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

export const createAPI = (onUnauthorized, onBadRequest) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/six-cities`,
    withCredentials: false,
    timeout: 5000,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const { response } = err;
    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    } else if (response.status === Error.BAD_REQUEST || Error.NOT_FOUND) {
      onBadRequest(err);
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
