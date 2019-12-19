// 
import Vue from "vue"
import Vuex from "vuex"

// use一下
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
    state: {
        // 用户信息
        userInfo: '',
    },
    // 修改数据的方法
    mutations: {
        changeUserInfo(state,newUserInfo) {
            // state 获取到定义的数据
            state.userInfo = newUserInfo
        },

    }
})

// 暴露出去
export default store