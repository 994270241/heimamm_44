// 导入axios
import axios from "axios"

// 导入token
import { getToken } from "../utils/token.js"

// 统一设置 axios的设置
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true,

})

// 暴露接口 用户信息
export function userinfo() {
    return instance({
        url: '/info',
        method: 'get',
        headers: {
            token: getToken()
        }
    })
}

// 暴露接口 退出登录
export function logout() {
    return instance({
        url: '/logout',
        method: 'get',
        headers: {
            token: getToken()
        }
    })
}