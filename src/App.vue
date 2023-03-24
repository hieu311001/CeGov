<template>
  <div >
    <TheHeader></TheHeader>
    <div class="layout-main">
      <TheMenu></TheMenu>
      <TheContent></TheContent>
    </div>
  </div>
</template>

<script>
import TheMenu from '@/layout/TheMenu.vue';
import TheContent from '@/layout/TheContent.vue';
import TheHeader from '@/layout/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheMenu,
    TheContent,
    TheHeader
  }
}
</script>

<style>
@import url(./assets/css/main.css);
</style>
