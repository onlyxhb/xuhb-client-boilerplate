import axios from 'axios'
import router from '@/router'
import { NET_ERR_MSG, NET_REQUEST_SUCCESS, RESPONSE_CODE, USER_TOKEN_KEY } from '@/constant/code'

// 初始化axios
const request: any = axios.create({
  baseURL: import.meta.env.VITE_ROOT || process.env.VITE_ROOT || '',
  timeout: 10000,
  headers: {
    // AUTHORIZATION:  `Bearer ${userInfo.token}`
  }
})

// 请求拦截
request.interceptors.request.use(
  (config: any) => {
    // 如果获取到token，则拼接到header里
    const token = localStorage.getItem(USER_TOKEN_KEY)
    if (token) {
      config.headers.AUTHORIZATION = token
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

// 返回拦截
request.interceptors.response.use(
  (res: any) => {
    const code = res.data.code

    if (code === RESPONSE_CODE.NO_PERMISSION) {
      router.push('/login')
    }
    return res
  },
  (error: any) => {
    window.Message.error(NET_ERR_MSG)
    return Promise.reject(error)
  }
)

// // 请求参数包装
const formatRequestData = (data = {}, method: any, config: any) => {
  // 自定义超时时长
  const { timeout } = config || {}

  if (timeout) {
    config.axiosConfig = { timeout }
  }

  if (method === 'get') {
    return {
      params: {
        ...data
      }
    }
  }
  if (config.dataType === 'form') {
    config.axiosConfig = config.axiosConfig || {}
    config.axiosConfig.headers = {
      'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime()
    }
    return data
  }

  return {
    ...data
  }
}

// 请求本体，逻辑包裹
function ajax(method: any, url = '', data = {}, config: any = {}) {
  return new Promise((resolve, reject) => {
    // 以下异常，都面向开发，在console报错
    if (!url) {
      return reject(new Error('url不能为空'))
    }

    request[method](url, formatRequestData(data, method, config), config?.axiosConfig)
      .then((result: any) => {
        const res = result.data

        const { successMsg, unhandleShowErr, errorMsg } = config || {}
        // 成功操作提示

        if (res.success) {
          if (successMsg) {
            window.Message.success(successMsg || NET_REQUEST_SUCCESS)
          }
          resolve(res)
        } else {
          switch (res.code) {
            case RESPONSE_CODE.ACTIVITY_NOT_PUBLISH:
              window.location.href = window.location.origin + window.location.pathname + '#/end'
              break
            case RESPONSE_CODE.TIME_OUT:
              router.replace('/noPermission')
              break
            case RESPONSE_CODE.GOODS_NOT_EXIST:
              //  跳转到错误页面
              window.location.href = window.location.origin + window.location.pathname + '#/error?message=商品不存在'
              break
            default:
              if (!unhandleShowErr) {
                window.Message.error(res.desc || NET_ERR_MSG)
              }
              if (errorMsg) {
                window.Message.error(errorMsg)
              }
              reject(res)
              break
          }
        }
      })
      .catch(reject)
  })
}

// 把参数改成formData
export const changeToFormData = (data = {}) => {
  const formData: any = new FormData()

  Object.entries(data).forEach(([key, value]) => formData.append(key, value))
  return formData
}

// 用于对外暴露的requests对象
const requests = {
  get(url: string, data: any, config?: any) {
    return ajax('get', url, data, config)
  },
  post(url: string, data: any, config?: any) {
    return ajax('post', url, data, config)
  },
  upload(files: any, config?: any, params?: any) {
    const file = files[0]

    const { url, ...rest } = config

    return ajax('post', url, changeToFormData({ ...params, file }), rest)
  },
  // config = {url: ..., timeout: ..., dataType: 'form'} 配置信息
  // params = {file: ..., ....} 表单参数
  upLoadFile(config: any, params: any) {
    const { url, ...rest } = config

    return ajax('post', url, changeToFormData({ ...params }), rest)
  },
  // 用来接默认当做get请求的组件内请求
  ajax(requestType: any, data: any, config: any) {
    if (config.method) {
      return ajax(config.method, requestType, data, config)
    }
    return ajax('get', requestType, data, config)
  }
}

export default { ...requests }
