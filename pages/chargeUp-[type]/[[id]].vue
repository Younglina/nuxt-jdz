<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-02 09:23:50
 * @Description: 记账
-->
<script setup>
const currentDate = new Date();
const chargeForm = ref({
  "date": [currentDate.getFullYear(), currentDate.getMonth() + 1].join('-'),
  "title": "",
  "inputType": "",
  "uses": [{ "name": "", "cost": "", "type": "" }]
})
const route = useRoute()
onMounted(async () => {
  if (route.params.type === 'edit') {
    const { data } = await $fetch(`/api/charge/getCharge?chargeId=${route.params.id}`)
    if (data.length) {
      data[0].uses = JSON.parse(data[0].uses)
      chargeForm.value = data[0]
    }
  }
})

const types = ref(['餐饮', '通讯', '日用', '婴儿用品', '家用', '麻将', '服装', '化妆品', '学习', '彩票', '交通', '医疗'])
const checked = ref([]);
const typePopupShow = ref(false)
let currentIndex = 0
const showTypePopup = (t, idx) => {
  if (t === 'close') {
    checked.value = []
    typePopupShow.value = false
  }
  if (t === 'save') {
    typePopupShow.value = false
    if (chargeForm.value.inputType) {
      checked.value.push(chargeForm.value.inputType)
    }
    const setType = [...new Set(checked.value)].filter(Boolean)
    chargeForm.value.uses[currentIndex].type = setType.join('、')
  }
  if (t === 'show') {
    currentIndex = idx
    checked.value = chargeForm.value.uses[idx].type.split('、')
    typePopupShow.value = true;
  }
};

const showDate = ref(false)
const showDatePicker = ref(false)
const onDateConfirm = ({ selectedValues }) => {
  chargeForm.value.date = selectedValues.join('-')
  showDatePicker.value = false
}

const showRes = ref(false)
const onSubmit = async () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
  let data
  if (route.params.id) {
    data = await $fetch('/api/charge/updateCharge', {
      method: 'post',
      body: chargeForm.value
    })
  } else {
    data = await $fetch('/api/charge/addCharge', {
      method: 'post',
      body: chargeForm.value
    })
  }
  if (data.status === 200) {
    showSuccessToast('保存成功');
  }
}
</script>
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="chargeForm.title" label="标题" placeholder="如：一月开销" left-icon="bill-o"></van-field>
      <van-field v-model="chargeForm.date" is-link readonly label="月份" placeholder="点击选择月份" @click="showDatePicker = true"
        left-icon="calendar-o" />
      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker @confirm="onDateConfirm" :columnsType="['year', 'month']" @cancel="showDatePicker = false"
          :min-date="new Date(2023, 0, 1)" :currentDate="chargeForm.date" />
      </van-popup>
      <van-calendar v-model:show="showDate" @confirm="onDateConfirm" />
    </van-cell-group>
    <van-divider />
    <div class="pr-20px text-right">
      <van-icon name="add-o" color="#1989fa" size="28"
        @click="chargeForm.uses.unshift({ name: '', cost: '', type: '' })" />
    </div>
    <van-cell-group inset class="important-mb-16">
      <div v-for="(item, index) in chargeForm.uses" :key="index"
        class="mb-10px ml-20px mr-30px p-2px relative border border-solid b-gray-100 border-rd">
        <van-field v-model="item.type" is-link readonly label="类型" left-icon="shopping-cart-o" placeholder="点击选择类型"
          @click="showTypePopup('show', index)" />
        <van-field v-model="item.name" label="用处" placeholder="如：火锅" left-icon="bag-o">
        </van-field>
        <van-field v-model="item.cost" label="花费" placeholder="如：100" left-icon="gold-coin-o">
        </van-field>
        <van-icon name="delete-o" class="important-absolute top-2 right--6" color="#ee0a24" size="20"
          @click="chargeForm.uses.splice(index, 1)" />
      </div>
    </van-cell-group>
    <div class="m-5 flex justify-between position-fixed bottom-0 left-0 right-0">
      <van-button round block @click="$router.go(-1)">
        返回
      </van-button>
      <van-button round block type="primary" native-type="submit">
        保存
      </van-button>
    </div>
    <!-- 类型选择弹窗 -->
    <van-popup v-model:show="typePopupShow" :close-on-click-overlay="false" class="p-20px">
      <van-field v-model="chargeForm.inputType" placeholder="没有选择的可以输入" />
      <van-checkbox-group v-model="checked" class="types-group">
        <van-checkbox v-for="item in types" :name="item">{{ item }}</van-checkbox>
      </van-checkbox-group>
      <div class="m-1 flex justify-between">
        <van-button round block @click="showTypePopup('close')">
          关闭
        </van-button>
        <van-button round block type="primary" @click="showTypePopup('save')">
          确定
        </van-button>
      </div>
    </van-popup>
    <van-dialog v-model:show="showRes" :title="chargeForm.title" show-cancel-button>
      <div class="p-4px text-center flex" v-for="(item, index) in chargeForm.uses" :key="index">
        <div class="c-blue w-50% inline-block text-right">{{ item.name }}: </div>
        <div class="c-red w-50% text-left">{{ item.cost }}元</div>
      </div>
      <div class="text-right m-5">
        总花费:<span class="c-red">{{ chargeForm.uses.reduce((a, b) => a + Number(b.cost), 0) }}元</span>
      </div>
    </van-dialog>
  </van-form>
</template>
<style scoped lang='scss'>
.types-group {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;

  .van-checkbox {
    margin-bottom: 4px;
    padding-left: 20px;
  }
}
</style>