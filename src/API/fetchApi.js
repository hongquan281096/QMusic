import { API_URL, TOKEN_API } from "../constants/urlApi";
import axios from 'axios';
import camelize from 'camelize';
// create instance normal
const customInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// config header Authorization each send request
customInstance.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // if (!config.headers['Authorization']) {
    //   config.headers['Authorization'] = `Bearer ${TOKEN_API}`;
    // }
    return config;
  },
  error => Promise.reject(error)
);

// handle response request
customInstance.interceptors.response.use(
  response => camelize(response.data),
  error => {
  console.log(error)
  }
);

export async function fetchApi(
  endpoint,
  method = 'GET',
  body,
  params = {},
  sourceToken = null
) {
  return customInstance({
    method: method,
    url: endpoint,
    data: body,
    params: { ...params, client_id: TOKEN_API },
    cancelToken: sourceToken
  });
}
export default fetchApi;
