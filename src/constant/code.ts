/** 后端返回 code 码 */
export const RESPONSE_CODE = {
  /** 正常 */
  NORMAL: '10000000',
  /** 参数错误 */
  REQUEST_PARAMS_ERROR: '10000001',
  /** 未登录 */
  NO_PERMISSION: '10000002',
  /** 网络环境不稳定，请稍后重试！ */
  NET_WORK_ERROR: '10000003',
  /** 地区不符 */
  LIMIT_AREA: '10000004',
  /** 身份不符 */
  LIMIT_VIP: '10000005',
  /** 积分不足 */
  LIMIT_CREDITS: '10000006',
  /** 无免费次数 */
  LIMIT_FREE_TIMES: '10000007',
  /** 无可参与次数 */
  LIMIT_TIMES: '10000008',
  /** 扣积分票据号不能为空 */
  TICKET_NUM_EMPTY: '10000009',
  /** 扣积分票据号错误 */
  TICKET_NUM_ERROR: '10000010',
  /** 活动未开始 */
  ACTIVITY_NOT_START: '10000011',
  /** 活动已结束 */
  ACTIVITY_ALREADY_END: '10000012',
  /** 活动未上架 */
  ACTIVITY_NOT_PUBLISH: '10000013',
  /** 期次结束没有下一个期次 */
  ACTIVITY_WEEKLY_END: '10000014',
  /** 风控拒绝 */
  RISK_CONTROL_REJECT: '10000015',
  /** 风控审核-滑块验证值 */
  RISK_CONTROL_CHECK: '10000016',
  /** 风控审核-滑块验证失败 */
  RISK_CONTROL_CHECK_ERROR: '10000017',
  /** 该活动不存在 */
  ACTIVITY_NOT_EXIT: '10000018',
  /** 应用已过期 */
  TIME_OUT: '10000019',
  /** 商品不存在 */
  GOODS_NOT_EXIST: '10000020',
  /** 商品改变 */
  GOODS_CHANGE: '10000021'
}

export const NET_ERR_MSG = '服务异常，请稍后再试'

export const NET_REQUEST_SUCCESS = '操作成功'

export const LOGIN_OUTTIME = '登录状态过期，请重新登录'

export const USER_TOKEN_KEY = 'CUSTOM_USER_PASSWORD_TOKEN_VALID'
