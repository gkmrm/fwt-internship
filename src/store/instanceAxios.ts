import { BASE_URL } from '@config/BASE_URLS';
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export default instanceAxios;
