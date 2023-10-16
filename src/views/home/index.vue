<script lang="ts" setup>
import { useStore } from '@/stores/invoice'
import HomeHeader from './components/homeHeader.vue'
import HomeMenus from './components/homeMenus.vue'
import HomeCard from './components/homeCard.vue'
const store = useStore()
onMounted(store.requestData)
</script>

<template>
  <db-container title="首页" body-class="home-page">
    <home-header />
    <a-carousel :default-current="3" auto-play class="home-carousel">
      <a-carousel-item>
        <img src="@/assets/images/login-bg1.jpg" />
      </a-carousel-item>
      <a-carousel-item>
        <img src="@/assets/images/login-bg2.jpg" />
      </a-carousel-item>
      <a-carousel-item>
        <img src="@/assets/images/login-bg3.jpg" />
      </a-carousel-item>
    </a-carousel>
    <home-menus />
    <home-card />
  </db-container>
</template>

<style lang="less" scoped>
:deep(.home-page) {
  display: flex;
  flex-direction: column;
}
.home-carousel {
  flex: 1;
  width: 100%;
  margin: 0 auto 10px;
}
</style>
