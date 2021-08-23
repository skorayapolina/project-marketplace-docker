import axios from "axios";
import RootStore from "../stores/RootStore";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

instance.interceptors.response.use(undefined,
  function (error) {
    if (error?.response?.status === 500) {
      RootStore.isServerError = true;
    }

    return Promise.reject(error);
  }
);

export { instance };
