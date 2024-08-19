import { defineStore } from 'pinia'

export const useSortStore = defineStore('sort', {
  state: () => ({
    currentSort: localStorage.getItem('currentSort') || 'default'
  }),
  actions: {
    setSortOption(option) {
      this.currentSort = option
      localStorage.setItem('currentSort', option)
    }
  },
  getters: {
    getCurrentSort: (state) => state.currentSort
  }
})

export const filterStore = defineStore("filter", {
    state: () => ({
        category: null,
        sortOrder: "asc"
    }),
    getters: {
        filteredProducts: (state) => {
            const { products } = useProductStore();
            const { priceRange, category, sortOrder } = state;
        }
    }
})