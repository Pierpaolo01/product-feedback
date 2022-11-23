
const dashBoardModuleRoutes = [
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import('@client/modules/DashboardModule/DashBoardModule.vue')
        }
]

export { dashBoardModuleRoutes }
