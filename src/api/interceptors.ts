import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_URL as string,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
}

const axiosClassic = axios.create(options)

export { axiosClassic }
