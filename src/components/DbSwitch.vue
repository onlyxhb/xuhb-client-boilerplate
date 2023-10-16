<script lang="ts" setup>
const props = defineProps({ modelValue: Boolean, activeText: String, inactiveText: String })
const emits = defineEmits(['update:modelValue'])
const handleChange = () => emits('update:modelValue', !props.modelValue)
</script>

<template>
  <div class="db-switch" :class="{ select: modelValue }">
    <a-button type="text" class="db-switch-btn" tabindex="-1" @click="handleChange">
      {{ inactiveText }}
    </a-button>
    <a-switch :model-value="modelValue" tabindex="-1" size="small" @update:model-value="handleChange" />
    <a-button type="text" class="db-switch-btn" tabindex="-1" @click="handleChange">
      {{ activeText }}
    </a-button>
  </div>
</template>

<style lang="less" scoped>
.db-switch {
  margin: 0;

  .arco-btn {
    padding: 0;
  }

  .arco-switch {
    margin: 0 10px;
  }

  .arco-btn:last-child {
    color: var(--color-text-1);
  }

  &.select {
    .arco-btn:first-child {
      color: var(--color-text-1);
    }

    .arco-btn:last-child {
      color: rgb(var(--primary-6));
    }
  }
}
</style>
