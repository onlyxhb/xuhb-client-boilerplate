import request from '@/api'

/** 用户登录 */
export const getCodeList = (params: any) => request.get('/code/getCodeList', params)

// 删除全部编码
export const clearAllCode = (params?: any) => request.post('/code/clearAllCode', params)

// 更新编码
export const updateUserCode = (params?: any) => request.post('/code/updateUserCode', params)
