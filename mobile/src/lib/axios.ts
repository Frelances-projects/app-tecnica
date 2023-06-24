import axios from 'axios'
import { API_BASE_URL } from '@env'

if (!API_BASE_URL) {
  throw Error('Invalid base URL.')
}

export const api = axios.create({
  baseURL: API_BASE_URL,
})
