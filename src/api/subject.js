// 导入axios
import axios from "axios"

// 统一设置 axios的设置
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
})

// 新增学科
export function subjectAdd(data) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data
    })
}

// 学科列表
export function subjectList(params) {
    return instance({
        url: '/subject/list',
        method: 'post',
        params,
    })
}

// 学科状态
export function subjectStatus(data) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data,
    })
}

// 学科编辑
export function subjectEdit(data) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data,
    })
}

// 学科删除
export function subjectRemove(data) {
    return instance({
        url: '/subject/remove',
        method: 'post',
        data,
    })
}