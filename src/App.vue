<script setup lang="ts">
import CatalogGrid from "./components/catalogGrid.vue";
import itemsData from "./assets/json/items.json"
import materialsData from "./assets/json/materials.json"
import {ref, onMounted, computed} from "vue";
import {cardData, filter} from './interfaces.ts'


const items = ref<cardData[]>(itemsData)

const filterMaterialId = ref<number | null>(null);
const sortOrder = ref<'default' | 'asc' | 'desc'>('default');

const filteredItems = computed((): CardData[] => {
  let filtered = items.value;

  if (Number(filterMaterialId.value) !== 0) {
    filtered = filtered.filter(item => item.material === Number(filterMaterialId.value));
  }

  if (sortOrder.value === 'desc') {
    filtered = filtered.sort((a, b) => a.price.current_price - b.price.current_price);
  } else if (sortOrder.value === 'asc') {
    filtered = filtered.sort((a, b) => b.price.current_price - a.price.current_price);
  }

  return filtered;
});




</script>

<template>
  <div class="container">
    <div class="breadcrumbs"></div>
    <h1 class="catalog__title">
      Комплекты стеллажных систем
    </h1>
    <div class="catalog__filters">
        <select v-model="sortOrder">
          <option value="default">По умолчанию</option>
          <option value="asc">По убыванию</option>
          <option value="desc">По Возрастанию</option>
        </select>
        <select v-model="filterMaterialId">
          <option value="0">все материалы</option>
          <option value="1">материал1</option>
          <option value="2">материал2</option>
        </select>
    </div>
    <catalog-grid :items="filteredItems"/>
  </div>

</template>

<style lang="sass" scoped>
  .container
    max-width: 1440px
    padding: 32px
    margin: 0 auto
</style>
