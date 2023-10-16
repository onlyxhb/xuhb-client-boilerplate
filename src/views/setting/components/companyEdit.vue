<script lang="ts" setup>
import FileSaver from 'file-saver'
import { getCompanyList, addMultiCompany, removeAll, removeOne, addOneCompany } from '@/api/company'
import { getListFromFile } from '@/utils/file'
// import { getCompanyInfo } from '@/utils/str'
import CompanyAdd from './companyAdd.vue'
const emits = defineEmits(['update:show'])
const props = defineProps({ show: Boolean })
const companyInfo = ref<any>({ visible: false, data: {} })
const listRef = ref()
const columns = [
  {
    title: '名称',
    dataIndex: 'cname'
  },
  {
    title: '识别号',
    dataIndex: 'sbh'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '银行',
    dataIndex: 'bank'
  }
]
const handleClear = async () => {
  await removeAll()
  window.Message.success('清空完成')
  listRef.value.getList(1)
}
const handleDelete = async (id: string) => {
  await removeOne({ id })
  window.Message.success('删除成功')
  listRef.value.getList()
}
// const handleRecognize = async (str: any) => {
//   const res = getCompanyInfo(str)
//   await addOneCompany(res)
//   window.Message.success('识别成功')
//   listRef.value.getList(1)
// }
const handleConfirm = async (info: any) => {
  await addOneCompany(info)
  window.Message.success('操作成功')
  if (info.id) {
    listRef.value.getList()
  } else {
    listRef.value.getList(1)
  }
}
const handleCompany = (info = {}) => {
  companyInfo.value = {
    visible: true,
    data: { ...info }
  }
}
// 导入
const handleImport = async (fileList: any, fileItem: any) => {
  const txtMaps = ['id', 'cname', 'code', 'sbh', 'address', 'bank', 'email', 'mark', 'valid']
  const xmlMaps = {
    BM: 'bm',
    MC: 'cname',
    KZ1: 'kz1',
    YJDZ: 'yjdz',
    NSRSBH: 'sbh',
    DZ: 'address',
    YHZH: 'bank',
    PID: 'pid',
    KZ2: 'kz2'
  }
  const maps = fileItem.name.endsWith('.txt') ? txtMaps : xmlMaps
  let result: any = []
  try {
    result = await getListFromFile({ ...fileItem }, maps, 'gb2312')
  } catch (error: any) {
    if (error.message === 'error encoding') {
      result = await getListFromFile({ ...fileItem }, maps, 'utf-8')
    }
  }
  const params = {
    list: result.map((item: any) => {
      return {
        cname: item.cname,
        sbh: item.sbh,
        address: item.address,
        bank: item.bank
      }
    })
  }
  await addMultiCompany(params)
  window.Message.success('用户编码更新完成!')
}
// 导出
const handleExport = (ext: any, list = []) => {
  const timestamp = Date.now()
  let txt = ''
  let str: any = ''
  if (ext === 'xml') {
    txt = '<?xml version="1.0" encoding="ANSI"?>'
    txt = txt + '\n' + '<Data TYPE="KEHUBIANMA">\n<KHXX>'
    list.forEach((item: any) => {
      txt +=
        '\n' +
        '<Row BM="10000001"  KZ1="" YJDZ="" O_BM="10000001" NSRSBH="' +
        item.sbh +
        '" JM="" KZ2="" YHZH="' +
        item.bank +
        '" MC="' +
        item.cname +
        '" DZ="' +
        item.address +
        '"  PID="100" O_PID="100"/>'
    })
    txt += '\n' + '</KHXX>'
    txt += '\n' + '</Data>'
    str = new Blob([txt], { type: 'text/plain' })
    FileSaver.saveAs(str, '用户编码 -' + timestamp + '.xml')
  }
  if (ext === 'txt') {
    txt = '{客户编码}[分隔符]"~~"'
    txt = txt + '\n' + '// 每行格式 :'
    txt = txt + '\n' + '// 编码~~名称~~简码~~税号~~地址电话~~银行账号~~邮件地址~~备注~~身份证校验'
    list.forEach((item: any, index: any) => {
      txt +=
        '\n' + (index + 1) + '~~' + item.cname + '~~~~' + item.sbh + '~~' + item.address + '~~' + item.bank + '~~~~~~'
    })
    str = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(str, '用户编码 -' + timestamp + '.txt')
  }
}
watch(
  () => props.show,
  (val: boolean) => val && listRef.value.getList(1)
)
</script>

<template>
  <a-modal :visible="show" hide-cancel class="company-edit-modal" :footer="false" @cancel="emits('update:show', false)">
    <template #title>编辑购货单位数据信息</template>
    <db-table :columns="columns" :auto-request="false" ref="listRef" :requestFn="getCompanyList">
      <template #form="{ list }">
        <a-space class="mgb-10">
          <span>购货单位输新增信息后会自动保存，下次直接下拉选择</span>
          <a-popconfirm content="确定清空用户编码吗？" position="bottom" type="warning" @ok="handleClear">
            <a-button type="primary" size="mini" status="danger">
              <template #icon><icon-delete /></template>
              <span>清空</span>
            </a-button>
          </a-popconfirm>
          <a-button type="primary" size="mini" @click="handleCompany({})">
            <template #icon><icon-plus /></template>
            <span>手动添加</span>
          </a-button>
          <a-upload :show-file-list="false" :auto-upload="false" @change="handleImport">
            <template #upload-button>
              <a-button type="primary" size="mini" status="success">
                <template #icon><icon-download /></template>
                <span>导入从税控盘导出的客户编码</span>
              </a-button>
            </template>
          </a-upload>
          <a-dropdown @select="(ext: any) => handleExport(ext, list)">
            <a-button size="mini">
              <span>导出用户信息</span>
              <icon-down class="mgl-10" />
            </a-button>
            <template #content>
              <a-doption value="txt">航天格式导出</a-doption>
              <a-doption value="xml">百旺UK格式导出</a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
      <template #opa="{ record }">
        <a-space>
          <a-button type="primary" size="mini" status="success" @click="handleCompany(record)">
            <icon-edit />
            <span>编辑</span>
          </a-button>
          <a-popconfirm content="删除后不可恢复，确认删除吗?" type="warning" @ok="handleDelete(record.id)">
            <a-button type="primary" size="mini" status="danger">
              <icon-delete />
              <span>删除</span>
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </db-table>
  </a-modal>
  <company-add v-model:visible="companyInfo.visible" :form-init-data="companyInfo.data" @confirm="handleConfirm" />
</template>

<style lang="less">
.company-edit-modal .arco-modal {
  width: 80%;
  min-width: 900px;
  max-width: 1500px;
}
</style>
