<script lang="ts" setup></script>

<template>
  <a-typography-text>使用多购货单位模板生成发票时</a-typography-text>
  <a-radio-group>
    <a-radio value="A">合并成一个发票文件</a-radio>
    <a-radio value="B">按公司名称生成多个发票文件</a-radio>
  </a-radio-group>
  <a-card :bordered="false" class="mgt-10">
    合并一个发票文件后只需要下载一次文件，导入的时候从文件里选择发票文件！
  </a-card>
  <a-typography-title :heading="6">
    当物业房产学校使用时候，由于没有明确的单价和数量，模板单价和数量可以留空，只输入金额。导入系统时系统自动填充数量为1,单价为金额。
  </a-typography-title>
  <db-switch active-text="发票文件保留单价和数量" inactive-text="发票文件不保留单价和数量" />
  <a-checkbox-group :default-value="['1']" direction="vertical">
    <a-checkbox value="1">导入清单时不弹出是否含税的询问框,导入清单后可手动切换</a-checkbox>
    <a-checkbox value="2">兼容清单的特殊符号，只针对航天信息税盘(白盘)，其它税盘生成后会无法导入。</a-checkbox>
    <a-checkbox value="3">设置电子发票清单最多100行（部分地区UK电子清单只能100行）</a-checkbox>
    <a-checkbox value="4">设置纸质发票清单最多8行（发票不进清单）</a-checkbox>
    <a-checkbox value="5">精简模板生成开票文件不弹出校检对话框</a-checkbox>
  </a-checkbox-group>
</template>

<style lang="less" scoped></style>
