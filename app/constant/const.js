export const baseURL = "https://bloging-server.vercel.app/api/";
import axios from 'axios';
export const apiService = axios.create({
  baseURL: 'https://bloging-server.vercel.app/api/',
});
