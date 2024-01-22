<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-27 22:27:58
 * @Description: 
-->
<script setup>
</script>
<template>
  <NuxtPage class="p-10px" />
  <van-tabbar route v-if="['overView', 'index'].includes($route.name)">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/overView" icon="search">总览</van-tabbar-item>
  </van-tabbar>
</template>