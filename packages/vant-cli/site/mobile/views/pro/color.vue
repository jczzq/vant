<template>
  <div class="pro-color" :style="{ backgroundColor }">
    <p>{{ backgroundColor }}</p>

    <VanButton block plain @click="onClick" color="black">Back</VanButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VanButton from 'vant/src/button';

const router = useRouter();
const props = defineProps<{
  color?: string;
}>();
const backgroundColor = ref(props.color);
const onClick = () => {
  router.go(-1);
};
</script>

<style lang="less">
.pro-color {
  --van-button-plain-background: transparent;

  box-sizing: border-box;
  text-align: center;
  height: 100vh;
  width: 100vw;
  padding: 0 20px;
  font-size: 28px;

  p {
    padding: 50px 0;
  }
}
</style>
