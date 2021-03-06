import axios from 'axios'
import store from '@/vuex'



axios.defaults.baseURL = 'http://39.97.237.248:8085'
if (store.getters.getToken) {
  axios.defaults.headers.common['token'] = store.getters.getToken
}


import {
  Loading,
  Message,
  MessageBox
} from 'element-ui'
export default {
  get(url, callback, params = {}) {
    const loading = Loading.service({
      lock: true,
      text: '数据加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    axios.get(url, {
      params: params
    }).then(response => {
      if (response.data.code === 200) {
        callback(response.data)
      } else {
        Message.error(response.data.message)
      }
    }).catch(err => {
      Message.error(err)
    }).finally(() => {
      loading.close()
    })
  },
  simpleGet(url, callbacks = null, params = {}) {
    axios.get(url, {params}).then(res => {
      if(callbacks == null) return
      if(res.data.code === 200 && callbacks._200!=null) {
        callbacks._200(res.data)
      } else if(res.data.code === 403 && callbacks._403!=null) {
        callbacks._403(res.data)
      } else if(res.data.code === 500 && callbacks._500!=null) {
        callbacks._500(res.data)
      } else if(callbacks._else!=null){
        callbacks._else(res.data)
      }
    }).catch(err => {
      if(callbacks!=null && callbacks._err!=null)
        callbacks._err(err)
      else Message.error(err)
    }).finally(() => {
      if(callbacks!=null && callbacks._fin!=null)
        callbacks._fin()
    })
  },
  post(url, callback, params = {},msg) {
      const formData = new FormData()
      for (let key in params) {
        formData.append(key, params[key])
      }
      const loading = Loading.service({
        lock: true,
        text: '数据提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 10000)
      axios.post(url, formData)
        .then(response => {
          if (response.data.code === 200) {
  
            if(msg===undefined  ){
                Message.success(response.data.message)
            }else if(msg != null && msg.length != 0 ){
              Message.success(msg)
            }
  
  
            callback(response.data)
          } else {
            Message.error(response.data.message)
          }
        }).catch(err => {
          Message.error(err)
        }).finally(() => {
          loading.close()
        })
    },
    simplePost(url, params = {}, callbacks = null) {
      const formData = new FormData()
      for (let key in params)
        formData.append(key, params[key])
      axios.post(url, formData).then(res => {
        if(callbacks == null) return
        if(res.data.code === 200 && callbacks._200!=null) {
          callbacks._200(res.data)
        } else if(res.data.code === 403 && callbacks._403!=null) {
          callbacks._403(res.data)
        } else if(res.data.code === 500 && callbacks._500!=null) {
          callbacks._500(res.data)
        } else if(callbacks._else!=null){
          callbacks._else(res.data)
        }
      }).catch(err => {
        if(callbacks!=null && callbacks._err!=null)
          callbacks._err(err)
        else Message.error(err)
      }).finally(() => {
        if(callbacks!=null && callbacks._fin!=null)
          callbacks._fin()
      })
    },
  /**如果是删除不用传第四个参数 如果是恢复 传back即可*/
  del(url, callback, params = {}, flag = 'del') {
    const text = flag === 'del' ? '确定要删除该数据吗?' : '确定要恢复数据吗'
    const title = flag === 'del' ? '删除操作' : '恢复操作'
    MessageBox.confirm(text, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const formData = new FormData()
      for (let key in params) {
        formData.append(key, params[key])
      }
      const loading = Loading.service({
        lock: true,
        text: '数据提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 10000)
      axios.post(url, formData)
        .then(response => {
          if (response.data.code === 200) {
            Message.success(response.data.message)
            callback(response.data)
          } else {
            Message.error(response.data.message)
          }
        }).catch(err => {
          Message.error(err)
        }).finally(() => {
          loading.close()
        })
    })
  },
  setToken(token) {
    axios.defaults.headers.common['token'] = token
  }
}