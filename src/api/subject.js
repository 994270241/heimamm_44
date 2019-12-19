import instance from "../utils/request.js"

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
        method: 'get',
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