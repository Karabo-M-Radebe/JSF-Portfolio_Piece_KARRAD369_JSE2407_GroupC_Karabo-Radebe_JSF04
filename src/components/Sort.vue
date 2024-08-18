<script setup>
  // import { defineProps } from 'vue';
  import { useSortStore } from '../stores/productStore';

  // const props = defineProps({
  //   onSortChange: { type: Function, required: true }
  // });
  
const sortStore = useSortStore();
  /**
   * this function handles the sorting of the products by targeting the value of the price  
   * @param event 
   */
  const handleSortChange = (event) => {
    sortStore.setSortOption(event.target.value);
  };
</script>

<template>
    <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
      <label for="sort" class="w-20 my-auto font-semibold">
        Sort by:
      </label>
      <select id="sort" @change="handleSortChange" :value="sortStore.getCurrentSort" class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        <option value="default">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
</template>
  
    
<style></style>