<template>
  <div class="pro">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <RouteTransition>
          <component :is="Component" />
        </RouteTransition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import RouteTransition from 'vant/src/route-transition';
</script>

<style lang="less">
.pro {
  height: 100%;
  width: 100vw;
}
</style>
