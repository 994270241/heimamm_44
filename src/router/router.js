// 导入Vue
import Vue from 'vue'
// 导包
import VueRouter from 'vue-router'
// 导入 login 组件 
import login from "../views/login/login.vue"
// 导入 index 组件
import index from "../views/index/index.vue"


// 导入token工具函数
import { getToken, removeToken } from "../utils/token.js"
// 导入用户信息接口
import { userinfo } from "../api/user.js"
// element-ui的 Message
import { Message } from 'element-ui'
// 导入仓库
import store from "../store/store.js"

// 导入嵌套路由
import children from "./children.js"
// Use一下 注册
Vue.use(VueRouter)
// 规则
const routes = [
    {
        path: '/login',
        component: login
    },
    // 首页规则
    {
        path: '/index',
        component: index,
        meta:{
            power : ['超级管理员','管理员','老师','学生']
        },
        children
    }
]
// 创建
const router = new VueRouter({
    routes// routes:routes
})

// 创建路由白名单 :
const whitePaths = ["/login"]

// 路由守卫
router.beforeEach((to, from, next) => {
    // 除了login 页面 都需要做登录判断
    if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
        // 必须要登录才可以访问
        if (!getToken()) {
            // 提示用户
            // window.alert('先登录')
            Message.error('主人,请先登录在访问')
            // 去登录页
            next("/login")
        } else {
            // 如果有token 继续走
            userinfo().then(res => {
                window.console.log("用户信息:", res);
                if (res.data.code === 200) {
                    // this.userinfo = res.data.data
                    // this.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`

                    if (res.data.data.status === 0) {
                        // 禁用状态
                        Message.warning('主人,你被封号了,请等待管理员启用你,在访问')
                        // 打回至登录页
                        next('/login')
                    } else {
                        // 启用状态
                        store.state.userInfo = res.data.data
                        store.state.userInfo.avatar = `${process.env.VUE_APP_BASEURL}/${store.state.userInfo.avatar}`
                        // 提交到仓库中去
                        store.commit("changeUserInfo", res.data.data)
                        // next()

                        // 判断当前用户是否可以去
                        //  window.console.log(to)
                         window.console.log(res.data.data)
                        // meta 访问的白名单匹配
                        if (to.meta.power.includes(res.data.data.role)){
                            // 存在
                            next()
                        }else{
                            // 当前的这个用户角色不存在,无法访问这个页面
                            Message.warning('你没有访问我的权限,请联系管理员')
                        }
                    }




                } else if (res.data.code === 206) {
                    // 提示用户
                    Message.warning('主人,不准偷偷摸摸来房间哦')
                    // 干掉token
                    removeToken()
                    // 返回登录页
                    next("/login")
                }
            })
        }
    } else {
        // 登录页,这届放过去
        next();
    }
})
// 暴露出去
export default router