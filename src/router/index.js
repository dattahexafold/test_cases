import {createWebHistory,createRouter} from 'vue-router'
import LoginPage from "../components/pages/LoginPage.vue"
import Dashboard from '../pages/dashboard.vue'
const routes=[
    {
        name:"login",
        path:"/",
        component:LoginPage
    },
    {
        name:"dashboard",
        path:"/dashboard",
        component:Dashboard
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router