<script lang="ts" setup>
import { useStore } from '@/stores/invoice'
import InvoiceList from './components/invoiceList.vue'
import invoiceTop from './components/invoiceTop.vue'
import Download from './components/download.vue'
import DownTop from './components/downTop.vue'
const store = useStore()
const finished = computed(() => store.taxInfo.finished)
const active = ref(0)
</script>

<template>
  <db-container title="开票" body-class="invoice-page">
    <template v-slot:tabs>
      <a-tabs v-model:active-key="active" type="rounded">
        <a-tab-pane :key="0" title="销货清单" />
        <a-tab-pane :key="1" title="开票历史" />
      </a-tabs>
    </template>

    <template #top>
      <invoice-top v-if="active === 0 && finished" />
      <down-top v-if="active === 1" />
    </template>

    <template #actions>
      <a-button v-if="active === 0 && !finished" type="dashed" size="mini" status="success">
        <template #icon><icon-download /></template>
        下载模版
      </a-button>
      <a-space v-if="active === 0 && finished">
        <a-button type="dashed" size="mini" status="danger">
          <template #icon><icon-dashboard /></template>
          自动附码
        </a-button>
        <a-button type="dashed" size="mini" status="success">
          <template #icon><icon-book /></template>
          生成纸质发票
        </a-button>
        <a-button type="dashed" size="mini" status="warning">
          <template #icon><icon-plus /></template>
          生成电子发票
        </a-button>
      </a-space>
    </template>

    <template v-if="active === 0">
      <invoice-list v-if="finished" />
      <a-upload
        v-else
        draggable
        :auto-upload="false"
        class="invoice-page-upload"
        action="/"
        :show-file-list="false"
        @change="store.updateExcel"
      >
        <template #upload-button>拖拽导入或者点击导入</template>
      </a-upload>
    </template>
    <download v-if="active === 1" />
  </db-container>
</template>

<style lang="less" scoped>
:deep(.invoice-page) {
  padding-top: 10px;
}
.invoice-page-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 160px;
  margin: 0 auto;
  color: var(--color-text-3);
  font-size: 24px;
  text-align: center;
  border: 2px dashed var(--color-text-4);
  border-radius: 5px;
}
</style>
