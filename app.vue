<script setup>
const active = ref(0)
</script>
<template>
  <NuxtPage />
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">总览</van-tabbar-item>
  </van-tabbar>
</template>