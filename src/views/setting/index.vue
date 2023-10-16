<script lang="ts" setup>
import MoreConfig from './components/moreConfig.vue'
import MultiInvoice from './components/multiInvoice.vue'
import ResultConfig from './components/resultConfig.vue'
import CompanyEdit from './components/companyEdit.vue'
import InvoiceConfig from './components/invoiceConfig.vue'
const showModal = ref(false)
const active = ref(0)
const current = ref(0)
</script>

<template>
  <db-container title="配置">
    <template v-slot:tabs>
      <a-tabs v-model:active-key="active" type="rounded">
        <a-tab-pane :key="0" title="发票设置" />
        <a-tab-pane :key="1" title="批量配置" />
        <a-tab-pane :key="2" title="结果汇总" />
        <a-tab-pane :key="3" title="更多配置" />
      </a-tabs>
    </template>
    <template #actions>
      <a-button v-if="active === 0 && current === 0" type="primary" size="mini" @click="showModal = true">
        <template #icon><icon-edit /></template>
        <span>编辑</span>
      </a-button>
    </template>
    <template #top>
      <div class="common-padding">
        <a-tabs v-if="active === 0" v-model:active-key="current">
          <a-tab-pane :key="0" title="购货单位" />
          <a-tab-pane :key="1" title="开票设置" />
          <a-tab-pane :key="2" title="销售方发票信息" />
          <a-tab-pane :key="3" title="电票分发交付管理" />
        </a-tabs>
      </div>
    </template>
    <invoice-config v-if="active === 0" :active="current" />
    <multi-invoice v-if="active === 1" />
    <result-config v-if="active === 2" />
    <more-config v-if="active === 3" />
  </db-container>
  <company-edit v-model:show="showModal" />
</template>

<style scoped lang="less"></style>
