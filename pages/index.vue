<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-28 15:04:58
 * @Description: 首页
-->
<script setup>
const toMe = () => {
  navigateTo('/chargeList')
}

async function submit() {
  const { body } = await $fetch('/api/user/addUser', {
    method: 'post',
    body: { test: 123 }
  })
}
</script>
<template>
  <div>index</div>
  <button @click="toMe" class="n-link-base">asdf</button>
  <button @click="submit">submit</button>
</template>
<style scoped lang='scss'></style>