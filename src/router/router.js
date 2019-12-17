// 导入Vue
import Vue from 'vue'
// 导包
import VueRouter from 'vue-router'
// 导入 login 组件 
import login from "../views/login/login.vue"
// 导入 index 组件
import index from "../views/index/index.vue"

// 导入嵌套路由的组件
// 学科组件
import subject from "../views/index/subject/subject.vue"
// 用户组件
import user from "../views/index/user/user.vue"
// 数据组件
import chart from "../views/index/chart/chart.vue"
// 题库组件
import question from "../views/index/question/question.vue"
// 企业组件
import enterprise from "../views/index/enterprise/enterprise.vue"


// 导入token工具函数
import { getToken, removeToken } from "../utils/token.js"
// 导入用户信息接口
import {userinfo} from "../api/user.js"
// element-ui的 Message
import { Message } from 'element-ui'
// 导入仓库
import store from "../store/store.js"
// Use一下 注册
Vue.use(VueRouter)
// 规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/index',
        component: index,
        children: [
            {
                path: "subject",  // index/subject
                component: subject
            },
            {
                path: "user",  // index/user
                component: user
            },
            {
                path: "chart",  // index/chart
                component: chart
            },
            {
                path: "question",  // index/question
                component: question
            },
            {
                path: "enterprise",  // index/enterprise
                component: enterprise
            },
        ]
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

                    store.state.userInfo = res.data.data
                    store.state.userInfo.avatar = `${process.env.VUE_APP_BASEURL}/${store.state.userInfo.avatar}`

                    next();
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