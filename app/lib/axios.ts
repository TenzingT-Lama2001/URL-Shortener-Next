import axios, { AxiosError } from 'axios';

// const baseURL = 'http://localhost:3000';
const baseURL = 'https://go-trim.tenzing121.com.np';



const createAxiosInstance = () =>
  axios.create({
    baseURL: `${baseURL}`,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      return Promise.reject(response);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
