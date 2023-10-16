import request from '@/api'

/** 购货单位 */
export const getCompanyList = (params?: any) => request.get('/config/getCompanyList', params)

/** 开票金额设置 */
export const getInvoiceInfo = (params?: any) => request.get('/config/getInvoiceInfo', params)
