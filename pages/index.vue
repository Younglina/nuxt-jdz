<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-28 15:04:58
 * @Description: 
-->
<script setup>
const jdz = useJdzStore()
const dataObj = reactive({
  food: [],
  scenic: [],
  porcelain: [],
})
await callOnce(jdz.getArea)
onMounted(async () => {
  console.log(jdz.areas, 'jdz.areas')
  jdz.areas.map(item => {
    dataObj[item.data_type].push(item)
  })
})
</script>
<template>
  <div class="p-10px ">
    <van-swipe :autoplay="3000" lazy-render class="h-30vh">
      <van-swipe-item v-for="item in jdz.areas.slice(0, 6)" :key="item.id">
        <img :src="item.firstImg" fit="fill" class="h-100% w-100%" />
        <span class="rd-4px bg-light-50 color-black absolute bottom-6px right-6px px-6px py-2px text-12px">
          {{ item.name }}
        </span>
      </van-swipe-item>
    </van-swipe>
    <card-list title="热门景点" :cards="dataObj.scenic"></card-list>
    <card-list title="热门美食" :cards="dataObj.food"></card-list>
    <card-list title="热门商区" :cards="dataObj.porcelain"></card-list>
  </div>
</template>
<style scoped lang='scss'></style>