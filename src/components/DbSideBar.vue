<script lang="ts" setup>
import { useConfig } from '@/hooks/config'
import IconFont from './IconFont.vue'
import ModalRecord from './ModalRecord.vue'
import ModalMember from './ModalMember.vue'

const memberModal = ref(false)
const recordModal = ref(false)
const { config } = useConfig()
const router = useRouter()
const handleClick = (key: string) => {
  router.push(key)
}
const handleDownload = () => {
  window.Modal.confirm({
    width: 350,
    top: 100,
    title: `打开${config.value?.title}桌面端`,
    titleAlign: 'start',
    alignCenter: false,
    content: () =>
      h('div', [
        `你可以一键唤起${config.value?.title}桌面端，快来试试吧`,
        h('p', [
          `若未安装${config.value?.title}桌面端，请`,
          h('a', { class: 'arco-btn-text', href: 'https://www.baidu.com' }, '点击此处'),
          '下载'
        ])
      ]),
    icon: '',
    cancelText: '取消',
    okText: '打开',
    onOk: () => console.log(5555)
  })
}
const handleSelect = (v: any) => {
  if (v === '7') {
    window.Modal.confirm({
      width: 350,
      top: 100,
      title: '退出登录',
      titleAlign: 'start',
      alignCenter: false,
      okButtonProps: { status: 'danger' },
      content: `确定要退出${config.value?.title}吗？`,
      icon: '',
      cancelText: '取消',
      okText: '退出',
      onOk: () => router.replace('login')
    })
  }
}
const defaultKey = ref(
  ['home', 'invoice', 'coding', 'search', 'setting', 'user'].find(key => location.hash.indexOf(key) > -1) || 'home'
)
</script>

<template>
  <a-layout-sider :width="240" class="db-sidebar">
    <div class="db-sidebar-header">
      <p class="common-flex-center-center">
        <img src="/logo.png" />
        <span>{{ config?.title }}</span>
      </p>
      <a-button size="mini" type="dashed" @click="handleDownload">桌面端</a-button>
    </div>
    <a-menu :default-selected-keys="[defaultKey]" @menu-item-click="handleClick">
      <a-menu-item key="home">
        <icon-home />
        首页
      </a-menu-item>
      <a-menu-item key="invoice">
        <icon-list />
        开票
      </a-menu-item>
      <a-menu-item key="coding">
        <icon-layers />
        编码
      </a-menu-item>
      <a-menu-item key="search">
        <icon-search />
        查询
      </a-menu-item>
      <a-menu-item key="setting">
        <icon-settings />
        配置
      </a-menu-item>
      <a-menu-item key="user">
        <icon-user />
        用户
      </a-menu-item>
    </a-menu>
    <div class="db-sidebar-footer">
      <div class="db-sidebar-progress">
        <div class="common-flex-between-center">
          30天/365天
          <a-button type="text" size="mini" @click="recordModal = true">时长明细</a-button>
        </div>
        <a-progress :percent="0.2" :show-text="false" />
      </div>
      <a-button class="db-sidebar-member" @click="memberModal = true">
        <icon-font type="PDSMembership" />
        <span class="mgl-10">开通会员</span>
      </a-button>
      <a-button class="db-sidebar-user" @click="$router.push('user')">
        <img src="https://img.aliyundrive.com/avatar/08a238da16b8473bb214fc0a073cb05e.jpeg" />
        <span>一起来随波逐流</span>
        <a-dropdown class="db-sidebar-dropdown" trigger="hover" style="width: 200px" @select="handleSelect">
          <icon-font type="PDSMoreCircle" />
          <template #content>
            <a-doption value="1">在线教程</a-doption>
            <a-doption value="2">打开官网</a-doption>
            <a-doption value="3">登录设备管理</a-doption>
            <a-dsubmenu value="4" class="db-sidebar-dropdown" trigger="hover">
              <template #default>帮助与反馈</template>
              <template #content>
                <a-doption value="41">隐私条款</a-doption>
                <a-doption value="42">用户协议</a-doption>
              </template>
            </a-dsubmenu>
            <a-doption value="5">申请远程协助</a-doption>
            <a-doption value="6" class="download">下载应用</a-doption>
            <a-doption value="7">退出登录</a-doption>
          </template>
        </a-dropdown>
      </a-button>
    </div>
  </a-layout-sider>
  <modal-member v-model:visible="memberModal" />
  <modal-record v-model:visible="recordModal" />
</template>

<style lang="less" scoped>
.db-sidebar {
  background-color: var(--background_secondary);
  -webkit-app-region: drag;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px 16px 36px;
    font-size: 12px;
    line-height: normal;

    .arco-btn {
      border-radius: 6px;
      outline: none !important;
      box-shadow: none !important;
      -webkit-app-region: no-drag;
    }

    img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
      border-radius: 16px;
    }
  }

  :deep(.arco-menu-inner) {
    padding: 0;
    background-color: var(--background_secondary);

    .arco-menu-item {
      margin: 0 12px;
      padding: 0 20px;
      color: var(--context_primary);
      line-height: 44px;
      background-color: transparent;
      border-radius: 8px;
      -webkit-app-region: no-drag;

      svg {
        margin-right: 14px;
        color: var(--context_primary);
        font-size: 18px;
      }
    }

    .arco-menu-item.arco-menu-selected {
      background-color: var(--divider_secondary);
    }

    .arco-menu-item:hover {
      background-color: var(--divider_tertiary);
    }
  }

  &-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .db-sidebar-progress {
      width: 100%;
      padding: 0 24px;
      font-size: 12px;

      .arco-btn {
        padding: 0;
        -webkit-app-region: no-drag;
      }
    }

    .db-sidebar-member {
      height: 38px;
      margin: 14px 24px 24px;
      padding: 6px 60px;
      color: var(--context_primary);
      border: 1px solid var(--divider_secondary);
      border-radius: 8px;
      -webkit-app-region: no-drag;

      &:hover {
        background-color: var(--divider_tertiary);
      }

      svg {
        font-size: 20px;
      }
    }

    .db-sidebar-user {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 75px;
      padding: 0 24px;
      font-size: 14px;
      line-height: normal;
      border-top: 1px solid var(--divider_primary);
      cursor: pointer;
      -webkit-app-region: no-drag;

      &:hover {
        background-color: var(--divider_tertiary);
      }

      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 16px;
      }

      span {
        width: 120px;
        margin-right: 20px;
        overflow: hidden;
        white-space: no-wrap;
        text-overflow: ellipsis;
      }

      svg {
        font-size: 20px;
      }
    }
  }
}
</style>

<style lang="less">
.db-sidebar-dropdown {
  padding: 4px !important;
  background: var(--background_tertiary) !important;
  border-radius: 10px !important;
  box-shadow: 0 0 1px 1px rgba(28, 28, 32, 0.05), 0 8px 24px rgba(28, 28, 32, 0.12) !important;

  .arco-dropdown {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }

  .arco-dropdown-list-wrapper {
    max-height: initial;
  }

  .download {
    color: var(--theme_primary) !important;
    font-weight: bold;
  }
}
</style>
