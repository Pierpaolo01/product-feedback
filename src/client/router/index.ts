import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import('@client/pages/DashboardPage/DashboardPage.vue')
        },
        {
            path: "/suggestion/create",
            name: 'create-suggestion',
            component: () => import('@client/pages/CreateSuggestionPage/CreateSuggestionPage.vue')
        },
        {
            path: "/authentication",
            name: "authentication",
            component: () => import('@client/pages/AuthenticationPage/AuthenticationPage.vue')
        },
        {
            path: '/',
            redirect: {name: "dashboard" }
        }
    ]
})

export { routes }
