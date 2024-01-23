<script setup>
const route = useRoute()

let detailData = reactive({}) // 数据详情
let showMore = ref(false) // 查看更多
let loading = ref(true)
let aryComment = ref([])
const isLike = ref(false)

onMounted(async () => {
  closeToast()
  showLoadingToast({
    message: '加载中...',
    duration: 0,
    loadingType: 'spinner',
  });
  // 获取对应的数据详情
  const { data: curData } = await $fetch(`/api/area/getArea?id=${route.params.id}`)
  detailData = curData[0] || {}
  console.log(curData)
  const { data: txComment } = await $fetch(`/api/area/getAreaComment?areakey=${detailData.areakey}`)
  console.log(txComment)
  aryComment.value = txComment
  loading.value = false
  closeToast()
})

// 地图导航
const actions = [{ name: '高德地图', type: 'gd' }, { name: '百度地图', type: 'bd' }]
const showAction = ref(false)
const onSelect = (v) => {
  // guide(v.type, detailData)
}

// 电话
const phoneCall = ref('phoneCall')
const showCall = () => {
  showConfirmDialog({
    message: `确定拨打电话?\n${detailData.phone}`,
    showCancelButton: true,
  }).then(() => {
    phoneCall.value.click();
  })
}

// // 评论相关
const toComment = () => {
  // if (!isLogin()) {
  showFailToast('请去我的页面进行登录或注册')
  //   return
  // }
  // router.push(`/page?areaKey=${detailData.key}&areaName=${detailData.name}&dataType=${detailData.dataType}`)
}

// // 喜欢
const handleLike = () => {
  // if (!isLogin()) {
  showFailToast('请去我的页面进行登录或注册')
  //   return
  // }
}
</script>

<template>
  <div class="detail-page">
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in detailData.imgs" :key="item">
        <img class="home-swipe__image" :src="item" :alt="item" />
      </van-swipe-item>
    </van-swipe>
    <van-skeleton v-if="loading" title :row="3" />
    <div v-else class="detail-container">
      <div class="detail-info">
        <div class="detail-info__title">
          <div>{{ detailData.name }}</div>
          <div @click="handleLike" class="i-mdi-heart" :color="isLike ? 'red' : 'inherit'"></div>
        </div>
        <van-divider />
        <div class="detail-info__address">
          <div>
            <div>{{ detailData.address }}</div>
            <div class="detail-info__cost">
              <div v-if="detailData.open_time"><van-icon name="clock-o" />{{ detailData.open_time }}</div>
              <div v-if="detailData.cost" class="detail-info__cost__money"><van-icon name="cash-o" />{{ detailData.cost }}
              </div>
            </div>
          </div>
          <div class="detail-info__action">
            <div @click="showAction = !showAction">
              <van-icon name="location-o" size="0.5rem" />
              <div>地图</div>
            </div>
            <div v-if="detailData.phone" @click="showCall">
              <a :href="`tel:${detailData.phone}`" ref="phoneCall" style="display: none;"></a>
              <van-icon name="phone-o" size="0.5rem" />
              <div>电话</div>
            </div>
          </div>
        </div>
        <van-action-sheet v-model:show="showAction" :actions="actions" @select="onSelect" />
      </div>
      <div class="detail-info">
        <div class="wy-title">介绍</div>
        <template v-if="detailData.introduction">
          <div class="detail-info__intor">{{ detailData.introduction?.slice(0, 50) + '...' }}</div>
          <div v-if="detailData.introduction.length > 50" class="detail-info__showmore" @click="showMore = !showMore">
            <div>查看更多</div>
          </div>
        </template>
        <div v-else>暂无</div>
        <van-popup v-model:show="showMore" round position="bottom" :style="{ height: '50%', padding: '20px' }">
          <div style="text-indent: 2em">{{
            detailData.introduction
          }}</div>
        </van-popup>
      </div>
      <div class="detail-info">
        <van-button @click="toComment" type="primary" block size="small" round>去留言</van-button>
        <comment-list :datalist="aryComment"></comment-list>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-swipe {
  height: 46vh;

  &__image {
    object-position: center center;
    object-fit: cover;
    height: 46vh;
    width: 100%;
  }

  :deep(.van-swipe__track) {
    align-items: center
  }

  :deep(.van-swipe__indicators) {
    bottom: 30px;
  }
}

.detail-page {
  overflow-y: auto;
}

.detail-container {
  position: absolute;
  margin-top: -26px;
  padding: 0 8px var(--van-tabbar-height);
  overflow-y: auto;
  border-radius: 20px;
  // box-shadow: 18px 10px 20px #ffffff, -18px 10px 20px #ffffff;
}

.detail-info {
  position: relative;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;

  &__title {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  &__address {
    display: flex;
    justify-content: space-between;

    >p {
      flex: 1;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;

    >div {
      min-width: 28px;
      padding: 0 4px;
    }
  }

  &__cost {
    display: flex;
    font-size: 14px;
    padding-top: 2px;

    .van-icon-clock-o {
      color: #409EFF;
      margin-right: 2px;
    }

    &__money {
      margin-left: 12px;
      color: #F56C6C;
    }
  }

  &__intor {
    font-size: 14px;
    text-indent: 1.4em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__showmore {
    position: absolute;
    bottom: 10px;
    right: 6px;
    font-size: 12px;
    color: #1989fa;
  }
}
</style>