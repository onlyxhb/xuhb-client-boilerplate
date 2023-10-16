<script lang="ts" setup>
// import { DropdownButton } from '@arco-design/web-vue'
</script>

<template>
  <div class="home-header">
    <a-steps class="home-steps">
      <a-step>
        <span>下载模版</span>
        <icon-right />
        <template #icon>
          <icon-download />
        </template>
      </a-step>
      <a-step>
        <span>编辑模版</span>
        <icon-right />
        <template #icon>
          <icon-edit />
        </template>
      </a-step>
      <a-step>
        <span>导入模版</span>
        <icon-right />
        <template #icon>
          <icon-import />
        </template>
      </a-step>
      <a-step>
        <span>自动赋码</span>
        <icon-right />
        <template #icon>
          <icon-check />
        </template>
      </a-step>
      <a-step>
        <span>生成开票文件</span>
        <template #icon>
          <icon-check-circle />
        </template>
      </a-step>
    </a-steps>
    <!-- <dropdown-button id="home-tour-one" class="home-dropdown">
      在线教程
      <template #icon>
        <icon-down />
      </template>
      <template #content>
        <a-doption>在线教程</a-doption>
        <a-doption>打开官网</a-doption>
        <a-doption>建议意见</a-doption>
        <a-doption>申请远程协助</a-doption>
        <a-doption>退出登录</a-doption>
      </template>
    </dropdown-button> -->
  </div>
</template>

<style lang="less" scoped>
.home-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 3px 15px;
  background-color: #eef1f6;
  background-image: linear-gradient(to right, rgb(217 237 247), rgb(208, 210, 211));
  .home-steps {
    margin: 0 auto;
    background: 0;
    border-radius: 0;
    .arco-steps-item {
      margin-right: 0;
      padding-top: 4px;
      overflow: visible;
    }
    :deep(.arco-steps-icon) {
      color: var(--color-text-2) !important;
      background: none;
      border-radius: 0;
      transform: translateX(14px);
    }
    :deep(.arco-steps-item-title) {
      color: var(--color-text-2) !important;
      font-size: 14px;
      svg {
        font-size: 18px;
        transform: translate(14px, 2px);
      }
      &::after {
        display: none;
      }
    }
  }
  .home-dropdown {
    border-radius: 4px;
    :deep(.arco-btn) {
      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>
