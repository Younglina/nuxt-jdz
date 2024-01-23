<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  cards: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <div class="card-list">
    <div class="text-16px font-500 my-6px">{{ title }}</div>
    <div class="flex flex-nowrap overflow-x-auto">
      <div v-for="item in cards" :key="item.id" class="p-6px relative" @click="$router.push(`/areaDetail/${item.id}`)">
        <van-image :src="item.firstImg" class="h-120px w-120px" fit="fill"></van-image>
        <div class="c-white absolute top-10px right-10px text-12px bg-#0006 flex px-4px py-1px rd-2px items-center">
          <div class="i-mdi-heart c-red mr-4px"></div>
          {{ item.likes }}
        </div>
        <div class="text-14px font-400">{{ item.name }}</div>
        <div class="text-14px c-truegray5 truncate w-120px">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'></style>