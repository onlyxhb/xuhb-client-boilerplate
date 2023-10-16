<script lang="ts" setup>
import { useStore } from '@/stores/invoice'
const store = useStore()
</script>

<template>
  <a-space class="common-flex common-flex-align-center common-padding" wrap>
    <a-input placeholder="输入商品名称过滤" class="w-150" />
    <db-switch inactive-text="不合并清单" active-text="合并清单" />
    <db-switch inactive-text="不含税" active-text="含税" />
    <a-dropdown>
      <a-button>
        导出excel
        <icon-down />
      </a-button>
      <template #content>
        <a-doption>导出清单到EXCEL</a-doption>
        <a-doption>按金税盘格式导出EXCEL</a-doption>
        <a-doption>按税控UK格式导出EXCEL</a-doption>
        <a-doption>按电票格式导出EXCEL</a-doption>
      </template>
    </a-dropdown>
    <a-button type="primary" size="mini" status="success">一键复制税收分类编码为空的名称</a-button>
    <a-button type="primary" size="mini" status="success">全屏</a-button>
  </a-space>
  <a-form
    :model="store.invoiceInfo"
    size="small"
    class="common-padding"
    :class="{ finished: store.taxInfo.finished }"
    layout="inline"
  >
    <a-form-item field="sbh" label="含税金额" class="danger w-230">
      <a-input disabled v-model="store.taxInfo.totalValue" placeholder="导入销货清单后自动提示" />
    </a-form-item>
    <a-form-item field="sbh" label="未税金额" class="danger w-230">
      <a-input disabled v-model="store.taxInfo.noTaxValue" placeholder="导入销货清单后自动提示" />
    </a-form-item>
    <a-form-item field="dz" label="税额" class="danger w-230">
      <a-input disabled v-model="store.taxInfo.taxValue" placeholder="导入销货清单后自动提示" />
    </a-form-item>
    <a-form-item field="kh" label="编码版本" class="w-230">
      <div class="common-flex-between long">
        <a-input v-model="store.invoiceInfo.version" class="w-60" />
        <a-checkbox v-model="store.invoiceInfo.isBalance">差额征收</a-checkbox>
      </div>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
