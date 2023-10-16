import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'
import { getCompanyList } from '@/api/config'
import { getInvoiceInfo } from '@/api/config'
import { getCsvToList } from '@/utils/file'

const defaultUserInfo = {
  username: '',
  state: '',
  endTime: ''
}

const defaultCompany = {
  id: 1, // 购货单位id
  cname: '十堰华思信息科技有限公司', // 购货单位名称
  sbh: '9142030039803012H', // 识别号
  address: '十堰市万达广场A-6层 13635715047', // 地址电话
  bank: '中国建设银行股份有限公司十堰分行营业部 42001618608053007601' // 开户行
}

const defaultInfo = {
  ...defaultCompany,
  cid: 1, // 购货单位id
  version: '40.0', // 编码版本
  remark: '', // 备注
  invoiceType: 0, // 发票种类
  invoiceLimit: 999.99, // 发票限额
  receiver: '', // 收款人
  auditor: '', // 复核人
  isBuy: false, // 收购票
  splitType: 0, // 拆分规则
  isBalance: false, // 差额征收
  isCount: false // 设置电票清单最多为100行
}

const defaultTaxInfo: {
  finished: boolean
  taxValue: undefined | string
  noTaxValue: undefined | string
  totalValue: undefined | string
  list: any
  selectedKeys: any
} = {
  finished: false, // 是否上传了清单
  taxValue: undefined, // 税额
  noTaxValue: undefined, // 不含税金额
  totalValue: undefined, // 含税金额
  list: [], // 清单列表
  selectedKeys: [] // 以选中列表
}

export const useStore = defineStore('invoice', {
  state: () => {
    return {
      loading: true,
      isClient: true,
      userInfo: { ...defaultUserInfo },
      invoiceInfo: { ...defaultInfo },
      companyList: [{ ...defaultCompany }],
      taxInfo: { ...defaultTaxInfo }
    }
  },
  getters: {
    isElectron: state => state.invoiceInfo.invoiceType !== 0,
    isWeb: state => !state.isClient
  },
  actions: {
    async requestData() {
      this.loading = true
      const userAgent = navigator.userAgent.toLowerCase()
      this.isClient = userAgent.indexOf(' electron/') > -1
      await this.requestUserInfo()
      // await this.requestInvoiceInfo()
      // await this.requestCompanyList()
      this.loading = false
    },
    async requestUserInfo() {
      try {
        const res: any = await getUserInfo()
        this.userInfo = res?.data || []
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async requestInvoiceInfo() {
      try {
        const res: any = await getInvoiceInfo()
        this.invoiceInfo = res?.data || []
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async requestCompanyList() {
      try {
        const res: any = await getCompanyList()
        this.companyList = res?.data || []
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 用户上传了销货清单
    async updateExcel(fileList: any, fileItem: any) {
      const list: any = await getCsvToList(
        { ...fileItem },
        {
          单位序号: 'cid',
          单位名称: 'cname',
          纳税人识别号: 'sbh',
          地址电话: 'address',
          开户行银行: 'bank',
          名称: 'name',
          型号: 'type',
          单位: 'unit',
          数量: 'number',
          '单价(含税或不含税)': 'price',
          '金额(含税或不含税)': 'total',
          税率: 'rate',
          税收分类编码: 'code',
          零税率标识: 'zero',
          折扣备注额: 'discount',
          备注: 'remark'
        }
      )
      const selectedKeys = list.map((item: any) => item.id)
      this.taxInfo = {
        finished: true,
        taxValue: '234.324',
        noTaxValue: '342.23',
        totalValue: '324234.34',
        selectedKeys,
        list
      }
    }
  }
})
