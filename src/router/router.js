// 导入Vue
import Vue from 'vue'
// 导入 login 组件 
import login from "../views/login/login.vue"
// 导入 index 组件
import index from "../views/index/index.vue"
// 导包
import VueRouter from 'vue-router'
// Use一下 注册
Vue.use(VueRouter)
// 规则
const routes = [
    {
        path : '/login',
        component : login
    },
    {
        path: '/index',
        component: index
    }
]
// 创建
const router = new VueRouter({
    routes// routes:routes
})
// 暴露出去
export default router