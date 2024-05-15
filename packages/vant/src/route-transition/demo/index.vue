<template>
  <demo-block :title="t('basicUsage')">
    <div class="p-x-5">
      <VanButton type="primary" @click="onClick" :text="t('open')" />
    </div>
  </demo-block>
</template>

<script setup>
import VanButton from '../../button';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    open: '打开新窗口体验',
  },
  'en-US': {
    open: 'Open New Window',
  },
});

const onClick = () => {
  window.open('/mobile.html#/pro');
};
</script>

<style lang="less">
.demo-route-transition {
  .p-x-5 {
    padding: 0 var(--van-padding-md);
  }
}
</style>
