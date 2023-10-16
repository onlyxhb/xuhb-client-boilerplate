import request from '@/api'

/** 公司列表 */
export const getCompanyList = (params: any) => request.get('/invoice/company/getList', params)

// 新建购货单位
export const addOneCompany = (params?: any) => request.post('/invoice/company/addOne', params)

// 批量导入
export const addMultiCompany = (params?: any) => request.post('/invoice/company/addMulti', params)

// 删除单个
export const removeOne = (params?: any) => request.post('/invoice/company/removeOne', params)

// 删除所有
export const removeAll = (params?: any) => request.post('/invoice/company/removeAll', params)
