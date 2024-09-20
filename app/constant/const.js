export const baseURL = "https://bloging-server.vercel.app/api/";
import axios from 'axios';
export const apiService = axios.create({
  baseURL: 'https://bloging-server.vercel.app/api/',
});
  const headers = {
  'Authorization': `Bearer ${"bnmnmn"}`,
  'Content-Type': 'application/json',
};

export const options = {
  headers: headers,
};