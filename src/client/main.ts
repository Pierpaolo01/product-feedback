import { createApp } from 'vue'
import './style.css'
import { routes } from "./router"
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import axios from "axios";
const app = createApp(App)

app.use(routes)


axios.defaults.baseURL = 'http://localhost:8080/api'

app.use(VueClickAway)
app.mount('#app')

