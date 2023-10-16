<script lang="ts" setup>
defineProps({ title: String, bodyClass: String, tabType: String })
const slots = useSlots()
</script>

<template>
  <div class="db-container">
    <div v-if="title || (slots.tabs && !tabType) || slots.actions" class="db-container-header">
      <div v-if="title || (slots.tabs && !tabType)" class="db-container-title">
        <slot name="title">
          <p class="db-container-title-value">{{ title }}</p>
        </slot>
        <slot name="tabs" v-if="!tabType" />
      </div>
      <div v-if="slots.actions" class="db-container-actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="db-container-tab" v-if="slots.tabs && tabType === 'newline'">
      <slot name="tabs" />
    </div>
    <div class="db-container-top" v-if="slots.top">
      <slot name="top" />
    </div>
    <div :class="`db-container-body ${bodyClass || ''}`">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-style {
  -webkit-app-region: no-drag;

  :deep(.arco-tabs-content) {
    display: none;
  }

  :deep(.arco-tabs-nav-type-rounded) {
    .arco-tabs-tab {
      margin: 0 8px 0 0;
      padding: 2px 10px;
      font-weight: 700;
      font-size: 12px;
      border: 1px dashed transparent;
      border-radius: 5px;

      &.arco-tabs-tab-active {
        color: var(--color-text-2);
        font-weight: 700;
        background-color: var(--color-fill-2);
        border-color: var(--color-neutral-3);
      }

      &:hover {
        font-weight: 700;
        background-color: var(--color-fill-2);
        border-color: var(--color-neutral-3);
      }
    }
  }
}

.db-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 28px;
  -webkit-app-region: drag;

  :deep(.arco-select-view),
  :deep(.arco-input-wrapper),
  :deep(.arco-textarea-wrapper) {
    background-color: #fff;
  }

  &-header {
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 24px;
    padding: 0 40px;
    font-weight: 700;
    font-size: 18px;
    -webkit-app-region: no-drag;
    .tab-style;
  }

  &-title {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    margin-right: 24px;

    &-value {
      margin-right: 28px;
    }
  }

  &-actions .arco-btn {
    display: flex;
    height: 32px;
    background-color: transparent;
    border-radius: 5px;

    &:hover {
      background-color: rgb(var(--gray-3));
    }

    svg {
      margin-right: 6px;
    }
  }

  &-tab {
    .tab-style;
  }

  &-top {
    -webkit-app-region: no-drag;
  }

  &-body {
    flex: 1;
    padding: 0 40px 20px;
    overflow-y: auto;
    -webkit-app-region: no-drag;

    &::-webkit-scrollbar {
      width: 10px;
      height: 1px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-neutral-4);
      border-radius: 5px;
      box-shadow: none;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 5px;
      box-shadow: none;
    }

    :deep(.arco-form-item) {
      margin-bottom: 14px;
    }
  }
}
</style>
