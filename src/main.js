import Vue from 'vue'
import App from './App.vue'
import store from "./store/store.js"

// 过滤器只要保证运行 即可 不需使用值
import './filters/filters.js'

// 导入初始化代码
import "./style/base.css"
// 导入接收 路由
import router from './router/router.js'
// 导入饿了么 ui
import ElementUI from 'element-ui';
// 导入饿了么 的样式
import 'element-ui/lib/theme-chalk/index.css';
// import "./router/children.js"
// 注册一下
Vue.use(ElementUI);

// 导入自定义指令
import "./directives/directives.js"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue示例上 router
  router,// router:router
  store,
  
  
}).$mount('#app')
