import axios from "axios";
import { getStoredUser, setStoredUser } from "../user-storage";
import jwt_decode from "jwt-decode";

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const protectedAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

protectedAxios.interceptors.request.use((config) => {
  let tokensData = getStoredUser();
  config.headers = config.headers || {};
  config.headers.Authorization = `bearer ${tokensData?.accessToken}`;
  return config;
});

export const apiInterceptor = (config: any, showDialog: () => void) => {
  let tokensData = getStoredUser();
  let decode: { sub: string; email: string; refreshTokenExpiration: Date } =
    jwt_decode(tokensData!.refreshToken);
  const expireTime = new Date(decode.refreshTokenExpiration).getTime();
  config.headers = config.headers || {};
  console.log("difference ", expireTime - new Date().getTime());
  if (new Date().getTime() > expireTime) {
    showDialog();
    console.log("refresh expiredddddddddddddddddddddddddd");
  }
  config.headers.Authorization = `bearer ${tokensData?.refreshToken}`;
  return config;
};

protectedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      let apiResponse = await refreshAxios.get("/auth/refresh");
      setStoredUser(apiResponse.data);
      error.config.headers[
        "Authorization"
      ] = `bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
