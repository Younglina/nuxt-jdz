<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-03 10:14:31
 * @Description: 
-->
<script setup>
const chargeList = ref({})
const activeNames = ref("")
const loading = ref(false);
import { useClipboard } from '@vueuse/core'
const onRefresh = async () => {
  chargeList.value = {}
  const { data } = await $fetch('/api/charge/getCharge?userId=1')
  loading.value = false;
  data.map(item => {
    const year = item.date.slice(0, 4)
    if (!chargeList.value[year]) {
      chargeList.value[year] = []
    }
    item.uses = JSON.parse(item.uses).sort((a, b) => Number(b.cost) - Number(a.cost))
    item.allCost = (item.uses.reduce((a, b) => a + Number(b.cost), 0)).toFixed(2)
    chargeList.value[year].push(item)
    return item
  })
};

const toEdit = (id) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
  setTimeout(() => {
    navigateTo(`/chargeUp-edit/${id}`)
  })
}

const source = ref('')
const { copy, copied, isSupported } = useClipboard({ source })
const toCopy = async (year, id) => {
  console.log(chargeList.value, chargeList.value[+year], year, id)
  const item = chargeList.value[+year].find(item => item.id === id)
  source.value = `${item.title}
${item.date}
${item.uses.map(item => `${item.name}: ${item.cost}元`).join('\n')}
总花费: ${item.allCost}元`
  await copy(source.value)
  if (copied.value) {
    showSuccessToast('复制成功');
  }
}

const handleAdd = () => {
  navigateTo('/chargeUp-add')
}

const deleteCharge = (id) => {
  showConfirmDialog({
    title: '删除',
    message:
      '你确定要删除该月记录吗？',
  })
    .then(async () => {
      await $fetch(`/api/charge/deleteCharge?id=${id}`)
      showSuccessToast('删除成功');
      onRefresh()
    })
    .catch(() => {
    });
}
onRefresh()
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" class="h-100vh">
    <div class="p-2 text-6 flex justify-between items-center">
      <span>Younglina的记账本</span>
      <van-button plain size="small" @click="handleAdd">新增</van-button>
    </div>
    <div v-for="(list, year) in chargeList" :key="year" class="mb-4">
      <div class="flex justify-between p-2 items-center">
        <span>{{ year }}年</span>
        <div>
          总花费: <span class="c-red">{{ list.reduce((a, b) => a + +b.allCost, 0).toFixed(2) }}元</span>
        </div>
      </div>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item v-for="item in list" :key="item.id" :name="item.id" class="collapse-item">
          <template #title>
            <div class="flex justify-between">
              <span>{{ item.title }}</span>
              <div>
                总花费: <span class="c-red">{{ item.allCost }}元</span>
                <van-icon v-if="isSupported" name="description-o" size="16" class="p-2px"
                  @click="toCopy(year, item.id)" />
                <van-icon name="edit" size="16" class="p-2px" @click="toEdit(item.id)" />
                <van-icon name="delete-o" size="16" class="p-2px" @click="deleteCharge(item.id)" />
              </div>
            </div>
          </template>
          <div class="p-4px flex" v-for="(uses, index) in item.uses" :key="index">
            <div class="c-blue w-50% inline-block text-right mr-4px">{{ uses.name }}: </div>
            <div class="c-red w-50% text-left"> {{ uses.cost }}元</div>
            <van-tag color="#ffe1e1" text-color="#ad0000" class="min-w-48px justify-center">{{ uses.type }}</van-tag>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </van-pull-refresh>
</template>
<style scoped lang='scss'>
.collapse-item {
  :deep(.van-collapse-item__content) {
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>