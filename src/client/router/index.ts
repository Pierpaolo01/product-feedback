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
            path: "/suggestion/:suggestion_id",
            name: 'view-suggestion',
            component: () => import('@client/pages/ViewSuggestionPage/ViewSuggestionPage.vue')
        },
        {
            path: "/suggestion/:suggestion_id/edit",
            name: 'edit-suggestion',
            component: () => import('@client/pages/EditSuggestionPage/EditSuggestionPage.vue')
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
