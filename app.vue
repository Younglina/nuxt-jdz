<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-27 22:27:58
 * @Description: 
-->
<script setup>
</script>
<template>
  <NuxtPage class="home-page" />
  <van-tabbar route v-if="['overView', 'index'].includes($route.name)">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/overView" icon="search">总览</van-tabbar-item>
  </van-tabbar>
</template>
<style lang='scss'>
.home-page {
  background-color: #f7f8fa;
  height: 100vh;
  overflow-y: auto;
}

:deep(p) {
  padding: 0;
  margin: 0;
}
</style>