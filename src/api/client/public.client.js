//---File 2 Front


import axios from "axios";
import queryString from "query-string";

const baseURL =  "http://127.0.0.1:5000/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

publicClient.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json"
  };
  return config;
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (err.response) {
      throw err.response.data;
    }
    throw err;
  }
);

export default publicClient;




// ****** Original Version****************

// import axios from "axios";
// import queryString from "query-string";

// const baseURL = "http://127.0.0.1:5000/api/v1/";

// const publicClient = axios.create({
//   baseURL,
//   paramsSerializer: {
//     encode: params => queryString.stringify(params)
//   }
// });

// publicClient.interceptors.request.use(async config => {
//   return {
//     ...config,
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
// });

// publicClient.interceptors.response.use((response) => {
//   if (response && response.data) return response.data;
//   return response;
// }, (err) => {
//   throw err.response.data;
// });

// export default publicClient;
