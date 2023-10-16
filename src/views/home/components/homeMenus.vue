<script lang="ts" setup></script>

<template>
  <div class="home-menus">
    <div id="home-tour-two">
      <img src="@/assets/images/icon-template-excel.svg" />
      <span>下载清单模版</span>
    </div>
    <div id="home-tour-three">
      <img src="@/assets/images/icon-list-import.svg" />
      <span>导入销货清单</span>
    </div>
    <div id="home-tour-four">
      <img src="@/assets/images/icon-operate.svg" />
      <span>自动附码</span>
    </div>
    <div>
      <img src="@/assets/images/icon-invoice.svg" />
      <span>生成纸质文件</span>
    </div>
    <div>
      <img src="@/assets/images/icon-electron.svg" />
      <span>生成电票文件</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-menus {
  position: sticky;
  top: 40px;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  padding: 5px 15px;
  background-color: var(--color-bg-2);
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-fill-2);
    }
    img {
      width: 30px;
      height: 30px;
      margin-bottom: 6px;
      border-radius: 2px;
    }
  }
}
</style>
