import { createRouter, createWebHistory } from 'vue-router'
import {dashBoardModuleRoutes} from "@client/modules/DashboardModule/DashBoardModuleRoutes"

const routes = createRouter({
    history: createWebHistory('/'),
    routes: [
        ...dashBoardModuleRoutes
    ]
})

export { routes }
