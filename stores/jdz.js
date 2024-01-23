/*
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-23 15:09:09
 * @Description: 
 */
export const useJdzStore = defineStore('jdzStore', {
  state: () => ({
    areas: [],
  }),
  actions: {
    async getArea() {
      const { data } = await $fetch('/api/area/getArea')
      this.areas = data
    },
  }
})