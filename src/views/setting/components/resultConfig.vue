<script lang="ts" setup>
const form = ref({
  name: '',
  sbh: '',
  dz: '',
  kh: '',
  bz: ''
})
const columns = [
  { title: '序号', dataIndex: 'index' },
  { title: '单位名称', dataIndex: 'name' },
  { title: '名称', dataIndex: 'salary' },
  { title: '型号', dataIndex: 'address' },
  { title: '单位', dataIndex: 'email' },
  { title: '数量', dataIndex: 'email' },
  { title: '金额', dataIndex: 'email' },
  { title: '税额', dataIndex: 'email' },
  { title: '编码', dataIndex: 'email' },
  { title: '开票时间', dataIndex: 'email' },
  { title: '发票号码', dataIndex: 'email' },
  { title: 'sap单号', dataIndex: 'email' }
]
const data = ref([])
</script>

<template>
  <a-typography-paragraph type="danger" class="mgb-10">
    此功能用于保存开票清单明细和对应的发票信息和开票时间
  </a-typography-paragraph>
  <a-space wrap>
    <a-upload action="/">
      <template #upload-button>
        <a-button size="mini" type="primary">手动导入发票清单XML文件(备份文件夹下)</a-button>
      </template>
    </a-upload>
    <a-upload action="/">
      <template #upload-button>
        <a-button size="mini" type="primary" status="success">手动导入开票日志文件(回写文件夹下)</a-button>
      </template>
    </a-upload>
    <a-select placeholder="可按序号查看清单" size="mini" class="w-150">
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option>Disabled</a-option>
    </a-select>
    <a-button size="mini" type="primary">导出结果到EXCEL</a-button>
    <a-button size="mini" type="primary" status="success">地址格式导出</a-button>
    <a-switch unchecked-color="rgb(var(--primary-6))">
      <template #checked>明细</template>
      <template #unchecked>汇总</template>
    </a-switch>
    <a-button type="primary" size="mini" status="danger">清空数据</a-button>
    <a-button type="primary" size="mini" status="danger">一键导入</a-button>
  </a-space>
  <a-form :model="form" size="small" class="result-config-form">
    <a-form-item field="sbh" label="XML文件目录">
      <a-input v-model="form.sbh" placeholder="请选择路径" />
      <a-button class="mgl-10">选择路径</a-button>
    </a-form-item>
    <a-form-item field="sbh" label="回写日志目录">
      <a-input v-model="form.sbh" placeholder="请选择路径" />
      <a-button class="mgl-10">选择路径</a-button>
    </a-form-item>
    <a-form-item field="sbh" label="时间范围">
      <a-range-picker show-time :default-value="['2019-08-08 00:00:00', '2019-08-18 00:00:00']" />
    </a-form-item>
  </a-form>
  <a-table :columns="columns" :data="data" :scroll="{ x: 1200 }">
    <template #empty>
      <p class="tlc">导入清单XML</p>
    </template>
  </a-table>
</template>

<style lang="less" scoped>
.result-config-form {
  max-width: 640px;
  margin-top: 10px;
}
</style>
