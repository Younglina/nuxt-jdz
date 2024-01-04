<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-04 13:42:53
 * @Description: 
-->
<script setup>
const allDate = ref([])
const yearView = ref([])
onMounted(async () => {
  const { data } = await $fetch(`/api/charge/getCharge?year=2023`)
  const yearData = {}
  data.map(item => {
    JSON.parse(item.uses).map(item => {
      if (!yearData[item.type]) {
        yearData[item.type] = 0
      }
      yearData[item.type] += Number(item.cost)
    })
  })
  const yearArr = Object.entries(yearData).sort((a, b) => b[1] - a[1])
  const yearTotal = yearArr.reduce((a, b) => a + Number(b[1]), 0).toFixed(2)
  yearArr.forEach(item => (item[1] = item[1].toFixed(2)))
  yearView.value = yearArr.map(item => {
    return {
      name: item[0],
      cost: item[1],
      percent: (item[1] / yearTotal * 100).toFixed(2)
    }
  })
})

</script>
<template>
  <div class="h-90vh overflow-y-auto p-2 text-12px">
    <div v-for="item in yearView" :key="item.name" class="m-2">
      <div>{{ item.name }}：{{ item.cost }}元</div>
      <div class="flex items-center">
        <div class="w-100% bg-aliceblue">
          <div class="cost-bar" :style="{ width: `${item.percent}%` }"></div>
        </div>
        <div class="ml-2">{{ item.percent }}%</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
.cost-bar {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  height: 10px;
  border-radius: 10px;
}
</style>