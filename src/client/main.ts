import { createApp } from 'vue'
import './style.css'
import { routes } from "./router"
import App from './App.vue'
import VueClickAway from "vue3-click-away";
const app = createApp(App)

app.use(routes)

app.use(VueClickAway)
app.mount('#app')

