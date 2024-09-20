export const baseURL = "https://bloging-server.vercel.app/api/";
import axios from 'axios';
export const apiService = axios.create({
  baseURL: 'https://bloging-server.vercel.app/api/',
});
let accessToken = localStorage.getItem("Sign") || ""
  const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};

export const options = {
  headers: headers,
};