import axios from 'axios'

const instance = axios.create({
  headers: {
    'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY
  },
  baseURL: `${import.meta.env.VITE_RESAS_URL}${import.meta.env.VITE_RESAS_VER}`
})

export default instance
