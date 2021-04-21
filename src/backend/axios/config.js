export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bgmentor.com/api'
    : 'http://127.0.0.1:3000/api'
export default API_URL
