<script lang="ts" setup>
defineProps({ visible: Boolean })
const emits = defineEmits(['update:visible'])
const handleClose = () => emits('update:visible', false)
</script>

<template>
  <a-modal title="开通会员" :visible="visible" class="modal-member" :footer="false" @update:visible="handleClose">
    <div class="modal-member-type">选择最适合你的会员类型</div>
    <div class="modal-member-list">
      <div class="modal-member-item">
        <div class="common-flex-between">
          <p class="modal-member-title">
            <icon-trophy />
            <span>专业会员</span>
          </p>
          <p class="modal-member-subtitle">
            <b>¥99</b>
            <span>/年</span>
          </p>
        </div>
        <div class="modal-member-tip">适合笔记深度用户，构建你的数字花园</div>
        <a-divider />
        <div class="modal-member-func">
          <div>
            <icon-down-circle />
            <span>不限文稿数</span>
          </div>
          <div>
            <icon-down-circle />
            更多格式、更大附件
          </div>
          <div>
            <icon-down-circle />
            知识库高级功能
          </div>
          <div>
            <icon-down-circle />
            互联网公开
          </div>
          <div>
            <icon-down-circle />
            基础特色功能
          </div>
          <div>
            <icon-down-circle />
            公开我的花园
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less">
.modal-member {
  .arco-modal {
    width: 500px;
    height: 500px;
  }

  .modal-member-type {
    margin-bottom: 12px;
    color: var(--yq-text-body);
  }

  .modal-member-item {
    position: relative;
    margin-bottom: 12px;
    padding: 16px;
    background-color: rgba(0, 185, 107, 0.02);
    border: 1px solid rgba(0, 0, 0, 0);
    border-color: var(--theme_hover);
    border-radius: 8px;

    .modal-member-title {
      font-weight: bold;
      font-size: 14px;

      svg {
        margin-right: 8px;
        font-weight: normal;
        font-size: 16px;
      }
    }

    .modal-member-subtitle {
      color: #8a8f8d;
      font-size: 10px;

      b {
        color: #000;
      }
    }
  }

  .modal-member-tip {
    margin-top: 6px;
    color: #585a5a;
    font-size: 12px;
  }

  .arco-divider-horizontal {
    margin: 10px 0;
  }

  .modal-member-func {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    div {
      width: 200px;
      color: #585a5a;
      font-size: 12px;

      svg {
        margin-right: 6px;
        color: var(--theme_hover);
        font-size: 14px;
      }
    }
  }
}
</style>
