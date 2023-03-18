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
import TheMenu from './components/layout/TheMenu.vue';
import TheContent from './components/layout/TheContent.vue';
import TheHeader from './components/layout/TheHeader.vue';

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
@import url(./css/main.css);
</style>
