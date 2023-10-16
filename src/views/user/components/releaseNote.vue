<script setup lang="ts">
const releaseNotes = ref([
  {
    version: '2.38.0',
    date: '2022-10-28',
    content: [
      {
        title: '新增功能',
        type: 'add',
        list: ['space: 增加split插槽']
      },
      {
        title: '问题修复',
        type: 'fix',
        list: ['select: 修复 formatLabel 在无数据时报错的问题', 'modal:修复自定义 style 时 z-index 不能生效的问题']
      },
      {
        title: '样式更新',
        type: 'style',
        list: ['table: 修复暗黑模式下 stripe 样式问题']
      },
      {
        title: '类型修正',
        type: 'type',
        list: ['添加实例类型导出']
      }
    ]
  },
  {
    version: '2.37.0',
    date: '2022-10-21',
    content: [
      {
        title: '问题修复',
        type: 'fix',
        list: [
          'date-picker: 修复 formatLabel 在无数据时报错的问题',
          'trigger: 修复在 windows 中 arrow 定位错误的问题',
          'modal: 修复函数式调用下，传入子组件不会触发卸载的问题'
        ]
      },
      {
        title: '功能优化',
        type: 'opt',
        list: [
          'cascader: 优化多选时的子菜单全部禁用时，父级禁止选择',
          'progress: 优化分割点的展示逻辑',
          'pagination: 优化输入页码时的数字处理'
        ]
      }
    ]
  }
])
const icons: any = {
  add: '🆕',
  fix: '🐛',
  style: '💅 ',
  type: '🆎 ',
  opt: '💎 '
}
</script>

<template>
  <a-timeline mode="left" labelPosition="relative">
    <a-timeline-item v-for="(note, index) in releaseNotes" :key="index" class="release-note-item">
      <div class="release-note-info">
        <p class="release-note-version">{{ note.version }}</p>
        <p class="release-note-date">{{ note.date }}</p>
      </div>
      <div class="release-note-content" v-if="note.content">
        <section v-for="(content, idx) in note.content" :key="idx">
          <h3 class="changelog-content-type">{{ icons[content.type] }} {{ content.title }}</h3>
          <ul class="changelog-content-list">
            <li v-for="text in content.list" :key="text">{{ text }}</li>
          </ul>
        </section>
      </div>
    </a-timeline-item>
  </a-timeline>
</template>

<style lang="less" scoped>
.release-note-item {
  margin-bottom: 10px;
  margin-left: 20px;
  :deep(.arco-timeline-item-dot-line) {
    border-color: var(--color-fill-3);
  }
  :deep(.arco-timeline-item-content) {
    display: flex;
  }
}
.release-note-info {
  flex-grow: 0;
  flex-shrink: 0;
  width: 100px;
  .release-note-version {
    color: var(--color-text-1);
    font-weight: 500;
  }
  .release-note-date {
    font-size: 12px;
    color: var(--color-text-3);
  }
}
.release-note-content {
  flex: 1;
  .changelog-content-type {
    color: var(--color-text-2);
    font-weight: 500;
    line-height: 24px;
    margin: 0;
  }
  ul.changelog-content-list {
    list-style: circle;
    margin: 10px 0;
    padding-left: 30px;
    line-height: 30px;
  }
}
</style>
