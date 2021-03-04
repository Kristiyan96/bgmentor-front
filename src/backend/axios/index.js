import axios from 'axios'
import store from '@/store'
import { API_URL } from '@/backend/axios/config'

// How to use
// - in components
// this.$http.roled/secured/plain.get('/items')
// - in stores
// this._vm.$http.roled/secured/plain.get('/items')

const commonOptions = {
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

const roledAxiosInstance = axios.create({
  ...commonOptions,
  baseURL: `${API_URL}/${store.getters.role}/`
})

const securedAxiosInstance = axios.create({
  ...commonOptions
})

const plainAxiosInstance = axios.create({
  ...commonOptions
})

const setScrf = (config) => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': store.state.auth.csrf
    }
  }
  return config
}

roledAxiosInstance.interceptors.request.use(setScrf)
securedAxiosInstance.interceptors.request.use(setScrf)

const onError = (error) => {
  if (
    error.response &&
    error.response.config &&
    error.response.status === 401
  ) {
    // In case 401 is caused by expired access cookie - we'll do refresh request
    return plainAxiosInstance
      .post(
        '/refresh',
        {},
        { headers: { 'X-CSRF-TOKEN': store.state.auth.csrf } }
      )
      .then((response) => {
        store.commit('refresh', response.data.csrf)
        // And after successful refresh - repeat the original request
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = store.state.auth.csrf

        return plainAxiosInstance.request(retryConfig)
      })
      .catch((error) => {
        store.commit('purgeAuth')
        // redirect to signin in case refresh request fails
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
}

roledAxiosInstance.interceptors.response.use(null, onError)
securedAxiosInstance.interceptors.response.use(null, onError)

export { securedAxiosInstance, plainAxiosInstance, roledAxiosInstance }
