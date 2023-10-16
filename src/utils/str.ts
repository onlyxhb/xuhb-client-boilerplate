import { spxx } from '@/assets/code'

export const toCamel = (str = '') => str.replace(/-([a-zA-Z])/g, (match, key) => key.toUpperCase())

// 文字脱敏处理
export function desensitization(str: string, beginLen: number, endLen: number) {
  const len = str.length
  const firstStr = str.substr(0, beginLen)
  const lastStr = str.substr(endLen)
  const middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/gi, '*')
  return firstStr + middleStr + lastStr
}

// 内置编码查询
export const getInnerCode = (keyword: string) => {
  try {
    const s = '([^;]*' + keyword + '[^;]*)'
    const reg = new RegExp(s, 'ig')
    const list = spxx.match(reg) || []

    return list.map(item => {
      const arr = item.split(':')
      const bm = arr[0].replace(';', '')
      const name = arr[1]
      return {
        code: bm,
        parentName: '内置未知',
        shortName: name,
        desc: arr[2],
        from: '内置'
      }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

// 解析从图片中获取的发票抬头信息
export const getCompanyInfo = (str: string) => {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      // 按照换行符分割字符串
      // 过滤掉空内容行、包含特殊字符内容
      // 去除空格
      const arr = (str.split('\n') || [])
        .filter((v: string) => v && v.indexOf(':') === -1 && v.indexOf('<') === -1)
        .map(item => item.replace(/\s/g, ''))
      // 公司名称
      const nameIdx = arr[0].indexOf('〇') > -1 ? arr[0].indexOf('〇') + 1 : 0
      // 税号所在行的下标
      const sbhIdx = arr.findIndex((v: string) => v.indexOf('税号') > -1)
      // 单位地址所在行的下标
      const addressIdx = arr.findIndex((v: string) => v.indexOf('单位地址') > -1)
      // 电话所在行的下标
      const phoneIdx = arr.findIndex((v: string) => v.indexOf('电话') > -1)
      // 开户银行所在行的下标
      const bankIdx = arr.findIndex((v: string) => v.indexOf('开户银行') > -1)
      // 银行账户所在行的下标
      const accountIdx = arr.findIndex((v: string) => v.indexOf('银行账户') > -1)

      if (addressIdx === -1) {
        reject(new Error('未识别到公司信息'))
      }
      // 公司名称
      const cname = arr.slice(0, sbhIdx).join('').slice(nameIdx)
      // 税号
      const sbh = arr.slice(sbhIdx, addressIdx).join('').slice(2)
      // 单位地址
      const address = arr.slice(addressIdx, phoneIdx).join('').slice(4)
      // 电话
      const phone = arr.slice(phoneIdx, bankIdx).join('').slice(2)
      // 开户银行
      const bank = arr.slice(bankIdx, accountIdx).join('').slice(4)
      // 银行账户
      const account = arr
        .slice(accountIdx, accountIdx + 1)
        .join('')
        .slice(4)

      resolve({ cname, sbh, address: `${address} ${phone}`, bank: `${bank} ${account}` })
    } catch (error) {
      reject(new Error('识别失败'))
      console.log(error)
      return {}
    }
  })
}

//获取对象中的值
// 支持obj['a.b.c.d']的用法
export const getObjProperty: any = (obj: any, property: string) => {
  const isObject = (o: any) => Object.prototype.toString.call(o) === '[object Object]'
  if (!isObject(obj) || typeof property !== 'string') return
  const arr = property.split('.')
  const res = obj[arr[0]]
  if (isObject(res)) {
    return getObjProperty(res, arr.slice(1).join('.'))
  }
  return res
}
