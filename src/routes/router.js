import { createRouter,createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import ProdDetail from "../views/ProdDetail.vue"
import Cart from "../views/Cart.vue"
import SignUp from "../views/SignUp.vue"
import Login from "../views/Login.vue"
import Favourites from '../views/Favourites.vue'
import Billing from "../views/Billing.vue"
import Orders from "../views/Orders.vue"
const routes=[
    {
        path:"/",
        name:"Home",
        component:Home
    },
    {
        path:"/ProdDetail/:id",
        name:"ProdDetail",
        component:ProdDetail
    },
    {
        path:"/Cart",
        name:"Cart",
        component:Cart,
        meta: { requiresAuth: true }
    },
    {
        path:"/SignUp",
        name:"SignUp",
        component:SignUp
    },
    {
        path:"/Login",
        name:"Login",
        component:Login
    },
    {
        path:"/Favourites",
        name:"Favourites",
        component:Favourites
    },
    {
        path:"/Billing",
        name:"Billing",
        component:Billing
    },
    {
        path:"/Orders",
        name:"Orders",
        component:Orders
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})



export default router;