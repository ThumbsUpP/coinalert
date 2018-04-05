import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data/',
    timeout: 1000,
  });

  export default instance