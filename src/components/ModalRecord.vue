<script lang="ts" setup>
defineProps({ visible: Boolean })
const emits = defineEmits(['update:visible'])
const handleClose = () => emits('update:visible', false)
</script>

<template>
  <a-modal title="时长明细" :visible="visible" class="modal-record" :footer="false" @update:visible="handleClose">
    <a-scrollbar type="track" class="modal-record-scroll">
      <div v-for="item in 10" :key="item" class="common-flex-between modal-record-item" :class="{ disabled: item > 5 }">
        <div class="modal-record-title">
          <span>老用户专属回归礼</span>
          <span v-if="item > 5" class="modal-record-tag">已过期</span>
        </div>
        <div class="common-flex-column">
          <p class="modal-record-time">1年</p>
          <p class="modal-record-tip">2023/04/10 到期</p>
        </div>
      </div>
    </a-scrollbar>
  </a-modal>
</template>

<style lang="less">
.modal-record {
  .arco-modal-body {
    padding: 0;
  }

  .modal-record-scroll {
    height: 500px;
    padding: 24px;
    overflow-y: auto;
  }

  .modal-record-item {
    height: 75px;
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid var(--divider_secondary);
    border-radius: 10px;
  }

  .modal-record-title {
    color: var(--context_primary);
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  .modal-record-time {
    margin-top: 0;
    color: var(--theme_primary);
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    text-align: right;
  }

  .modal-record-tip {
    margin-top: 4px;
    color: var(--context_tertiary);
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
  }

  .modal-record-item.disabled {
    color: red;

    .modal-record-title {
      color: var(--context_tertiary);
    }

    .modal-record-time {
      color: var(--theme_secondary);
    }

    .modal-record-tip {
      color: var(--context_quarternary);
    }

    .modal-record-tag {
      margin-left: 10px;
      padding: 2px 8px;
      color: var(--context_quarternary);
      font-size: 10px;
      background: var(--background_secondary);
      border-radius: 5px;
    }
  }
}
</style>
