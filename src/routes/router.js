import { createRouter,createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import ProdDetail from "../views/ProdDetail.vue"
import Cart from "../views/Cart.vue"
import SignUp from "../views/SignUp.vue"
import Login from "../views/Login.vue"
import Favourites from '../views/Favourites.vue'
import { components } from "vuetify/dist/vuetify.js";
// import { components } from "vuetify/dist/vuetify.js";
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
        component:Cart
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
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router;