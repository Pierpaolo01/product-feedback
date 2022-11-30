import { createApp } from 'vue'
import './style.css'
import { routes } from "./router"
import App from '@client/App.vue'
import VueClickAway from "vue3-click-away"
import axios from "axios"
const app = createApp(App)

app.use(routes)


axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.request.use((req) => {
    const token = localStorage.getItem('product-feedback-token')

    req.headers!.Authorization = `bearer ${token}`

    return req
})

axios.interceptors.response.use(
    (res) => {
        return res
    },
    async (res) => {
        if(res.response && res.response.status === 401) {
            await routes.push({name: 'authentication'})
        }
        return Promise.reject(res)
    }
)

app.use(VueClickAway)
app.mount('#app')
