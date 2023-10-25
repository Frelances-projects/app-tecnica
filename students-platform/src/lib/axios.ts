import axios from 'axios'
// import { API_BASE_URL } from '@env'
// console.log("🚀 ~ file: axios.ts:3 ~ API_BASE_URL:", API_BASE_URL)

// if (!API_BASE_URL) {
//   throw Error('Invalid base URL.')
// }

export const api = axios.create({
  // baseURL: 'http://172.31.217.7:3333',
  baseURL: 'https://app-tecnica-api.onrender.com',
})
