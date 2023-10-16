<script lang="ts" setup></script>

<template>
  <div class="content">
    <a-result class="result" status="404" subtitle="你请求的资源不存在,点击返回跳转到首页"></a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="$router.replace('home')">返回</a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  position: absolute;
  top: 40%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
