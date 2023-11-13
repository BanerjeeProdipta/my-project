import axios from "axios";

const onResponse = (response: any) => {
  return response;
};

const onResponseError = async (err: any) => {
  return Promise.reject(err);
};

const response = { onResponse, onResponseError };

export default response;
