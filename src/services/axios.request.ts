const onRequest = async (config: any) => {
  return config;
};

const onRequestError = (error: any) => {
  return Promise.reject(error);
};

const request = { onRequest, onRequestError };

export default request;
