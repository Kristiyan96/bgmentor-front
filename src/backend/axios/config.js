export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bgmentor.com/api'
    : 'http://localhost:3000/'
export default API_URL
