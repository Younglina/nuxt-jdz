<script setup>
</script>
<template>
  <NuxtPage />
  <van-tabbar route v-if="['overView', 'index'].includes($route.name)">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/overView" icon="search">总览</van-tabbar-item>
  </van-tabbar>
</template>