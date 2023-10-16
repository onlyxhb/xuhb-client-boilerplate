<script lang="ts" setup>
import { useStore } from '@/stores/invoice'
import dayjs from 'dayjs'
import { USER_STATE } from '@/constant/enum'
const store = useStore()
const endTime = computed(() => dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss'))
const version = computed(() => USER_STATE.find((item: any) => item.value === store.userInfo.state))
</script>

<template>
  <a-card class="home-card" :bordered="false">
    <p>账号：{{ store.userInfo.username || '随波逐流' }}</p>
    <p>
      <span>版本：</span>
      <a-typography-text type="danger">{{ version?.label || '正式版' }}</a-typography-text>
    </p>
    <p>
      <span>到期日期：</span>
      <a-typography-text type="danger">{{ endTime }}</a-typography-text>
    </p>
    <p>联系客服：QQ455586546</p>
    <p>电话微信：13635715047</p>
    <p>qq群：13141000</p>
  </a-card>
</template>

<style lang="less" scoped>
.home-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700;
  margin-top: 10px;
  font-size: 14px;
  line-height: 30px;
}
</style>
