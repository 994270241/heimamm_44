// 导入axios
import axios from "axios"
import { getToken } from "./token.js";

// 统一设置 axios的设置
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前 干一些 事情
    // window.console.log('请求发送之前')
    // window.console.log(config)

    // 可以添加请求头
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 请求错误之后 干一些事情
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应的数据 干 一些事情
    // window.console.log("响应数据获取到之后")
    // window.console.log(response)
    return response.data;
}, function (error) {
    // 当响应错误的时候 干一些事情
    return Promise.reject(error);
});


//暴露出去
export default instance