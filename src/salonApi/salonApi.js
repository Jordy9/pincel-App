import axios from 'axios'

const salonApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Interceptores

salonApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default salonApi;