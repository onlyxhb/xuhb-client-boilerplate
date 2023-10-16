<script lang="ts" setup>
const form = ref({
  name: '',
  sbh: '',
  dz: '',
  kh: '',
  bz: ''
})
</script>

<template>
  <a-form class="multi-invoice" :model="form" size="small">
    <a-typography-paragraph type="danger" class="mgb-10">
      此功能需要客户端版软件,可向客服索要客户端安装包，客户端不支持XP系统，客户端账户和网页版通用，无需额外费用。
    </a-typography-paragraph>
    <a-typography-paragraph type="danger" class="mgb-10">
      此功能用于无缝对接开票系统，生成发票文件自动保存到指定路径后，在开票系统里设置对应路径为批量导入开票路径，即可自动开票。
    </a-typography-paragraph>
    <a-form-item field="sbh" label="发票文件保存路径">
      <a-input v-model="form.sbh" placeholder="请选择路径" />
      <a-button class="mgl-10" type="outline" size="small">选择路径</a-button>
    </a-form-item>
    <a-form-item field="sbh" label="销货清单加载路径">
      <a-input v-model="form.sbh" placeholder="请选择路径" />
      <a-button class="mgl-10" type="outline" size="small">选择路径</a-button>
    </a-form-item>
    <a-typography-paragraph type="danger" class="mgb-10">
      此功能主要用户展示批量开票回写结果到我们软件界面（发票是否开具成功，失败的原因）,此路径需要和税盘批量开票回写路径一致，设置路径后软件自动检测，有开票日志后自动弹窗展示。
    </a-typography-paragraph>
    <a-form-item field="sbh" label="批量开票回写路径">
      <a-input v-model="form.sbh" placeholder="请选择路径" />
      <a-button class="mgl-10" type="outline" size="small">选择路径</a-button>
    </a-form-item>
    <a-card :bordered="false" class="mgb-10">
      此功能主要用于动态延时操作开票文件到发票导入目录，以免批量开票时，发票上传过慢导致开票失败的问题。此功能是处理批量开票时离线金额和离线时长不足的最佳解决方案。
      <a-button type="primary" status="success" size="mini" class="mgt-10">
        运行批量开票离线金额离线时长不足的解决方案
      </a-button>
    </a-card>
    <a-card :bordered="false">
      批量处理XML支持新版开票软件（此功能对接一些财务软件生成的XML，定制功能）！
      <a-button type="primary" status="success" size="mini" class="mgt-10">点击导入XML自动处理</a-button>
    </a-card>
  </a-form>
</template>

<style lang="less" scoped>
.multi-invoice.arco-form {
  max-width: 840px;
}
</style>
