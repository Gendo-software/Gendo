import Axios from 'axios';
import Config from 'StaticConfig/config';
import AuthManager from '../../Auth/AuthManager';

const logError = error => {
  console.error(`api request error:
  method: ${error.config.method}
  url: ${error.config.url}
  data: ${error.config.data}
  message: ${error.message}
  more details in below object:`);
  console.dir(JSON.parse(JSON.stringify(error)));
};

export default class ApiClientBase {
  constructor() {
    console.log(`Create Axios instance: baseURL: ${Config.ApiBaseUrl}`);
    this.axiosInstance = Axios.create({
      baseURL: Config.ApiBaseUrl,
      timeout: 30000,
      headers: {
        Authorization:
          'Bearer ' + AuthManager.getAuthObject().AuthInfo.AccessToken,
      },
    });
  }
  get = async (url, params) => {
    console.log(`request ${url}, params: ${params}`);
    return this.axiosInstance.get(url).catch(ex => {
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
