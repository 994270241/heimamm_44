// 导入axios
import axios from "axios"

// 统一设置 axios的设置
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
})

// 暴露接口
export function login(data) {
    return instance({
        url : '/login',
        method : 'post',
        data
    })
}

// 暴露接口 短信
export function sendsms(data) {
    return instance({
        url: '/sendsms',
        method: 'post',
        data
    })
}

// 暴露接口 注册
export function register(data) {
    return instance({
        url: '/register',
        method: 'post',
        data
    })
}