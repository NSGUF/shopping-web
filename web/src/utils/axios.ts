import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import Vue from 'vue';

// 创建axios实例
const service = axios.create({
  timeout: 5000 // 请求超时时间
})

/**
 * respone拦截器
 * code:200,接口正常返回;
 */
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
    // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
    if (res.code === 5001 || res.code === 5002 || res.code === 5004) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    if (res.code === 401) {
      location.href = '/login'
      localStorage.setItem('userInfo', JSON.stringify({}))
      Vue.prototype.$store.commit('loginOut');
    }
    return Promise.resolve(res);
  } else {

    return response.data;
  }
},
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.resolve(error)
  }
)

export default service
