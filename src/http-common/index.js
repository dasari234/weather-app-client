import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';

axios.interceptors.request.use(
  (request) => {
    // eslint-disable-next-line no-param-reassign
    request.config = {
      ...(request.config ?? {}),
      start: Date.now(),
    };

    return request;
  },
);

axios.interceptors.response.use(
  (response) => {
    const now = Date.now();
    console.info(`Api Call ${response.config.url} took ${now - response.config.config.start}ms`);
    return response;
  },
  (error) => Promise.reject(error),
);

export default axios;