<script setup>
  import { ref, watchEffect } from 'vue';
  
  const props = defineProps({
    categories: { type: Array, default: () => [] },
    selectedCategory: { type: String, default: '' },
    onCategoryChange: { type: Function, default: () => {} }
  });
  
  const selectedCategory = ref(props.selectedCategory);
  
  /**
   * this function focuses on filtering the products by targeting the value of the categories 
   * @param event 
   */
  const handleChange = (event) => {
    props.onCategoryChange(event.target.value);
  };
  
  /**
   * this Vue hook allows the value of the selectedCategory to become reactive to the defined props
   */
  watchEffect(() => {
    selectedCategory.value = props.selectedCategory;
  });
</script>

<template>
    <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
      <label for="category" class="w-20 my-auto font-semibold">
        Filter:
      </label>
      <select id="category" @change="handleChange" v-model="selectedCategory" class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        <option value="">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
</template>
  
  