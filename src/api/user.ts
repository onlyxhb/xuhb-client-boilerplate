import request from '@/api'

/** 用户注册 */
export const doRegister = (params: any) => request.post('system/user/register', params)

/** 用户登录 */
export const doLogin = (params: any) => request.post('system/user/login', params)

/** 钉钉登录 */
export const loginWithDing = (params: any) => request.post('/system/user/loginWithDing', params)

/** 修改密码 */
export const updatePwd = (params: any) => request.get('system/user/updatePwd', params)

/** 获取用户信息 */
export const getUserInfo = (params?: any) => request.get('system/user/getUserInfo', params)

/** 上传用户 */
export const uploadUser = (params?: any) => request.post('system/user/uploadUser', params)

export const queryCertification = (params?: any) => request.post('system/user/queryCertification', params)
