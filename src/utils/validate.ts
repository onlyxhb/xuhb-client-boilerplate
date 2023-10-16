export const requireRule = {
  required: true,
  message: '不能为空',
  trigger: ['blur', 'change']
}
export const requireRule2 = {
  required: true,
  pattern: /[^ \cL]/,
  message: '必填，不能为空格',
  trigger: ['blur', 'change']
}
export const arrayRequireRule = {
  required: true,
  type: 'array',
  min: 1,
  message: '请选择一项',
  trigger: 'change'
}
export const intRule = {
  pattern: /^-?\d*$/,
  message: '请输入整数',
  trigger: ['blur', 'change']
}
export const intRule2 = {
  pattern: /^\d+$/,
  message: '请输入大于等于0的整数',
  trigger: ['blur', 'change']
}
export const positiveIntRule = {
  pattern: /^[1-9]\d*$/,
  message: '请输入正整数',
  trigger: ['blur', 'change']
}
export const idsRule = {
  pattern: /^\d+(,\d+)*$/,
  message: '格式错误',
  trigger: ['blur', 'change']
}

export const requireRuleMsg = (message = '不能为空', trigger = ['blur', 'change']) => {
  return {
    required: true,
    message,
    trigger
  }
}
export const lengthRuleFn = (maxP: any, minP = 0, message: string) => {
  const min = Math.min(maxP, minP)
  const max = Math.max(maxP, minP)
  const msg = min === 0 ? '已超出最大限制，请注意长度' : `长度应该在${min}~${max}之间`
  return {
    max,
    min,
    type: 'string',
    message: message || msg,
    trigger: ['blur', 'change']
  }
}

export const decimalRuleFn = (fixed = 2) => ({
  // eslint-disable-next-line
  pattern: new RegExp(`^[0-9]+(\.[0-9]{0,${fixed}})?$`),
  message: `请输入${fixed}位小数`,
  trigger: ['blur', 'change']
})

export const REG_PHONE = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/
export const REG_EMAIL =
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const REG_URL =
  /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/?($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

/* url */
export const validateURL = (val: string) => REG_URL.test(val)

/* 小写字母 */
export const validateLowerCase = (str: string) => /^[a-z]+$/.test(str)

/* 大写字母 */
export const validateUpperCase = (str: string) => /^[A-Z]+$/.test(str)

/* 大小写字母 */
export const validateAlphabets = (str: string) => /^[A-Za-z]+$/.test(str)

/* 邮箱 */
export const validateEmail = (email: string) => REG_EMAIL.test(email)

/* 手机号 */
export const validatePhone = (phone: string) => REG_PHONE.test(phone)

// 正整数
export const validatePositiveInteger = (number: string) => /^[1-9]\d*$/.test(number)

// 整数
export const validateInteger = (number: string) => /^-?\d*$/.test(number)

// 开始时间必须大于当前时间
export function beyondToday() {
  return (rule: string, time: any, cb: any) => {
    if (!time) return cb()
    const startTime = time[0]
    if (!startTime) return cb(new Error('开始时间必须大于当前时间'))
    if (new Date(startTime).getTime() < new Date().getTime()) {
      return cb(new Error('开始时间必须大于当前时间'))
    }
    return cb()
  }
}
