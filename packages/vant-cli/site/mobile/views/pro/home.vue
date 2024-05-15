<template>
  <div class="pro-home">
    <CellGroup inset title="Favorite Color">
      <Cell title="Aqua" is-link to="/pro/color/aqua" />
      <Cell title="Violet" is-link to="/pro/color/violet" />
      <Cell title="Bisque" is-link to="/pro/color/bisque" />
    </CellGroup>
  </div>
</template>

<script setup lang="ts">
import Cell from 'vant/src/cell';
import CellGroup from 'vant/src/cell-group';
</script>

<style lang="less">
.pro-home {
  height: 100%;
  .link-item {
    margin: var(--van-padding-md);
    padding: var(--van-padding-md);
    display: block;
    height: 36px;
    font-size: 24px;
  }
}
</style>
