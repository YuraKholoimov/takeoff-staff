import axios from 'axios';

export const instanceAuth = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export const instanceContacts = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true,
});
