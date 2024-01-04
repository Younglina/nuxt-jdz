<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-04 13:42:53
 * @Description: 
-->
<script setup>
const allDate = ref([])
const yearView = ref([])
onMounted(async () => {
  getOverviewData()
})

async function getOverviewData() {
  const { data } = await $fetch(`/api/charge/getCharge?year=2023`)
  const yearData = {}
  data.map(item => {
    JSON.parse(item.uses).map(item => {
      if (!yearData[item.type]) {
        yearData[item.type] = { cost: 0, name: item.type, child: [] }
      }
      yearData[item.type].cost += Number(item.cost)
      yearData[item.type].child.push(item)
    })
  })
  const yearArr = Object.entries(yearData).sort((a, b) => b[1].cost - a[1].cost)
  const yearTotal = yearArr.reduce((a, b) => a + Number(b[1].cost), 0).toFixed(2)
  yearArr.forEach(item => (item[1].cost = item[1].cost.toFixed(2)))
  yearView.value = yearArr.map(item => {
    return {
      name: item[0],
      cost: item[1].cost,
      percent: (item[1].cost / yearTotal * 100).toFixed(2),
      child: item[1].child
    }
  })
}

const showDetailPopup = ref(false)
const detailList = ref([])
const popupTitle = ref('')
function showDetail(type) {
  const detail = yearView.value.find(item => item.name === type)
  detailList.value = detail.child.sort((a, b) => b.cost - a.cost)
  popupTitle.value = `${detail.name}：${detail.cost}元`
  showDetailPopup.value = true
}
</script>
<template>
  <div class="h-90vh overflow-y-auto p-2">
    <div v-for="item in yearView" :key="item.name" class="m-2 text-12px">
      <div><span class="text-blue" @click="showDetail(item.name)">{{ item.name }}</span>：{{ item.cost }}元</div>
      <div class="flex items-center">
        <div class="w-100% bg-aliceblue">
          <div class="cost-bar" :style="{ width: `${item.percent}%` }"></div>
        </div>
        <div class="ml-2">{{ item.percent }}%</div>
      </div>
    </div>
    <van-dialog v-model:show="showDetailPopup" :title="popupTitle">
      <div class="p-4 h-300px overflow-y-auto">
        <div class="p-4px flex" v-for="item in detailList" :key="item">
          <div class="c-blue w-50% inline-block text-right mr-4px">{{ item.name }}: </div>
          <div class="c-red w-50% text-left"> {{ item.cost }}元</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<style scoped lang='scss'>
.cost-bar {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  height: 10px;
  border-radius: 10px;
}
</style>