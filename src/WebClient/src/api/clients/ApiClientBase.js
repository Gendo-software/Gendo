import Axios from 'axios';
import AuthManager from '../../auth/AuthManager';

const logError = error => {
  const errorDetails = getErrorDetails(error);

  console.error(`api request error:
  errorMessage: ${errorDetails.message}
  errorCode: ${errorDetails.code}
  
  method: ${error.config.method}
  url: ${error.config.url}
  data: ${error.config.data}
  message: ${error.message}
  more details in below object:`);
  console.dir(JSON.parse(JSON.stringify(error)));
  console.dir(JSON.parse(JSON.stringify(error.response)));
};

const getErrorDetails = error => {
  if (error && error.response && error.response.data)
    return {
      message: error.response.data.message,
      code: error.response.data.code,
    };
  else return {};
};

export default class ApiClientBase {
  constructor(baseURL) {
    console.log(`Create Axios instance: baseURL: ${baseURL}`);

    this.axiosInstance = Axios.create({
      baseURL: baseURL,
      timeout: 30000,
    });

    this.axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization =
        'Bearer ' + AuthManager.getAuthObject().AuthInfo.AccessToken;

      return config;
    });
  }
  get = async (url, params) => {
    console.log(`request ${url}, params: ${JSON.stringify(params)}`);
    return this.axiosInstance.get(url, { params: params }).catch(ex => {
      logError(ex);
      throw ex;
      // check interceptor instead this solution
    });
  };
  post = async (url, data) => {
    console.log(`request ${url}, data: ${data}`);
    return this.axiosInstance.post(url, data).catch(ex => {
      logError(ex);
      throw ex;
    });
  };

  put = async (url, data) => {
    console.log(`request ${url}, data: ${data}`);
    return this.axiosInstance.put(url, data).catch(ex => {
      logError(ex);
      throw ex;
    });
  };

  delete = async (url, data) => {
    console.log(`request ${url}, data: ${data}`);
    return this.axiosInstance.delete(url, data).catch(ex => {
      logError(ex);
      throw ex;
    });
  };
}
