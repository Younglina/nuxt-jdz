<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-28 15:04:58
 * @Description: 
-->
<script setup>
const images = ref([])
const { imgBase } = useAppConfig()
async function getImages() {
  const { data } = await useFetch('/api/area/getArea')
  data.value.data.slice(0, 6).map(item => {
    const imgs = JSON.parse(item.images)
    if (imgs.length) {
      images.value.push({
        url: `${imgBase}${imgs[0]}`,
        name: item.name,
        likes: item.likes,
        description: item.description
      })
    }
  })
}
getImages()
</script>
<template>
  <div>
    <van-swipe :autoplay="3000" lazy-render class="h-30vh">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.url" fit="fill" class="h-100% w-100%" />
        <span class="rd-4px bg-light-50 color-black absolute bottom-6px right-6px px-6px py-2px text-12px">
          {{ image.name }}
        </span>
      </van-swipe-item>
    </van-swipe>
    <card-list title="热门推荐" :cards="images"></card-list>
  </div>
</template>
<style scoped lang='scss'></style>