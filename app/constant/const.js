export const baseURL = "http://localhost:12312/api/";
import axios from 'axios';
export const apiService = axios.create({
  baseURL: 'http://localhost:12312/api/',
});
