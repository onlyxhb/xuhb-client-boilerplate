<script setup lang="ts">
import { useStore } from '@/stores/invoice'
import { HOME_RULES, HOME_LIMITS, HOME_TYPES } from '@/constant/enum'
defineProps({ active: Number })
const store = useStore()
const form = ref({
  name: '',
  sbh: '',
  dz: '',
  kh: '',
  bz: ''
})
const columns = [
  {
    title: '用户标识',
    dataIndex: 'name'
  },
  {
    title: '发票地址',
    dataIndex: 'salary'
  },
  {
    title: '上传时间',
    dataIndex: 'address'
  },
  {
    title: '操作',
    slotName: 'operator',
    dataIndex: 'operator'
  }
]
const data = ref([])
const handleDelete = (index: number) => console.log(index)
</script>

<template>
  <div class="setting-invoice-config">
    <a-form v-if="active === 0" :model="store.invoiceInfo" size="small" class="config-page-form">
      <a-form-item field="name" label="单位名称">
        <a-select v-model="store.invoiceInfo.cid" placeholder="输入后按回车创建或下拉选择" allow-create>
          <a-option v-for="item in store.companyList" :key="item.id" :label="item.cname" :value="item.id" />
        </a-select>
      </a-form-item>
      <a-form-item field="sbh" label="识别号">
        <a-input v-model="store.invoiceInfo.sbh" placeholder="百旺和UK税控盘必须输入此内容" />
      </a-form-item>
      <a-form-item field="dz" label="地址电话">
        <a-input v-model="store.invoiceInfo.address" placeholder="请输入地址电话" />
      </a-form-item>
      <a-form-item field="kh" label="开户行">
        <a-input v-model="store.invoiceInfo.bank" placeholder="请输入开户行银行" />
      </a-form-item>
    </a-form>
    <a-form v-if="active === 1" :model="store.invoiceInfo" size="small" class="config-page-form">
      <a-form-item field="name" label="发票种类">
        <div class="common-flex-between common-flex-align-center long">
          <a-select v-model="store.invoiceInfo.invoiceType" placeholder="请选择" class="flex1">
            <a-option v-for="item in HOME_TYPES" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
          <a-input disabled class="mgl-10 w-200" placeholder="兼容航信、百望、Ukey" />
        </div>
      </a-form-item>
      <a-form-item field="name" label="发票限额">
        <div class="common-flex-between common-flex-align-center long">
          <a-select v-model="store.invoiceInfo.invoiceLimit" placeholder="请选择" class="flex1">
            <a-option v-for="item in HOME_LIMITS" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
          <a-input disabled class="mgl-10 w-200" placeholder="若发票超限将自动分票" />
        </div>
      </a-form-item>
      <a-form-item field="sbh" label="收款人">
        <div class="common-flex-between common-flex-align-center long">
          <a-input v-model="store.invoiceInfo.receiver" placeholder="选填" class="flex1" />
          <p class="form-item-inline-label">复核人</p>
          <a-input v-model="store.invoiceInfo.auditor" placeholder="选填" class="flex1" />
        </div>
      </a-form-item>
      <a-form-item field="dz" label="收购票">
        <div class="common-flex-between common-flex-align-center long">
          <a-checkbox v-model="store.invoiceInfo.isBuy" class="flex1">收购票</a-checkbox>
          <p class="form-item-inline-label">拆分规则</p>
          <a-select v-model="store.invoiceInfo.splitType" placeholder="请选择" class="flex1">
            <a-option v-for="item in HOME_RULES" :key="item.value" :label="item.label" :value="item.value" />
          </a-select>
        </div>
      </a-form-item>
      <a-form-item field="bz" label="备注">
        <a-textarea
          v-model="store.invoiceInfo.remark"
          class="h-150"
          placeholder="支持输入备注信息,若每张发票备注内容不同，请下载使用多企业模板。"
          show-word-limit
          allow-clear
        />
      </a-form-item>
    </a-form>

    <a-form v-if="active === 2" :model="form" size="small">
      <a-typography-paragraph type="danger" class="mgb-10">
        开具电子发票需要输入正确的销货方信息,具体内容请参考自己的税盘。
      </a-typography-paragraph>
      <a-form-item field="sbh" label="名称">
        <a-select v-model="form.name" placeholder="输入后按回车创建或下拉选择">
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
          <a-option disabled>Disabled</a-option>
        </a-select>
        <a-button class="mgl-10" type="outline" size="small">
          <icon-edit />
          <span>编辑</span>
        </a-button>
      </a-form-item>
      <a-form-item field="sbh" label="纳税人识别号">
        <a-input v-model="form.sbh" placeholder="请选择路径" />
      </a-form-item>
      <a-form-item field="sbh" label="地址、电话 ">
        <a-input v-model="form.sbh" placeholder="请输入地址、电话" />
      </a-form-item>
      <a-form-item field="sbh" label="开户行、银行">
        <a-input v-model="form.sbh" placeholder="请输入开户行、银行" />
      </a-form-item>
      <a-typography-paragraph type="danger" class="mgb-10">
        此功能主要用户展示批量开票回写结果到我们软件界面（发票是否开具成功，失败的原因）,此路径需要和税盘批量开票回写路径一致，设置路径后软件自动检测，有开票日志后自动弹窗展示。
      </a-typography-paragraph>
      <a-form-item field="sbh" label="批量开票回写路径">
        <a-input v-model="form.sbh" placeholder="请选择路径" />
        <a-button class="mgl-10" type="outline" size="small">选择路径</a-button>
      </a-form-item>
    </a-form>

    <template v-if="active === 3">
      <a-typography-paragraph type="danger" class="mgb-10">
        软件也支持电子邮箱使用POP3/SMTP协议推送发票文件，但是需要您提前下载已开具的发票文件到本地。若您有更好的解决方案，可以联系我们商讨，免费为您升级来满足您个性化需求。
      </a-typography-paragraph>
      <a-typography-paragraph class="mgb-10">
        此功能用于电子发票PDF或ODF文件管理分发，用户编辑上传模板文件，模板为TXT文本，内容格式为'用户标识~~发票文件路径',一行一个
      </a-typography-paragraph>
      <a-typography-paragraph class="mgb-10">
        用户自主在网页下载自己的发票,需要输入用户标识(此标识可以是订单号或者任何能代表唯一用户标识的字符串)
      </a-typography-paragraph>
      <a-typography-paragraph class="mgb-10">
        用户端发票下载地址为:zhushou.huasivip.com/#/dzfp,输入标识号,下载对应的发票。
      </a-typography-paragraph>
      <a-space class="mgb-10">
        <a-button size="small">
          <icon-upload />
          <span>上传文件</span>
        </a-button>
        <a-input-search class="w-230" placeholder="内容搜索" size="small" />
        <a-button type="primary" status="danger" size="small">
          <icon-delete />
          <span>清空</span>
        </a-button>
      </a-space>
      <a-table :columns="columns" :data="data">
        <template #empty>
          <p class="tlc">暂无数据</p>
        </template>
        <template #operator="{ rowIndex }">
          <a-button type="primary" size="mini" status="danger" @click="handleDelete(rowIndex)">
            <icon-delete />
            <span>删除</span>
          </a-button>
        </template>
      </a-table>
    </template>
  </div>
</template>

<style scoped lang="less">
.setting-invoice-config {
  width: 60%;
  min-width: 640px;
  height: 100%;
  padding-top: 40px;
}
.form-item-inline-label {
  padding: 0 10px;
}
</style>
