<script setup lang="ts">
import CatalogGrid from "./components/catalogGrid.vue";
import itemsData from "./assets/json/items.json"
import materialsData from "./assets/json/materials.json"
import {ref, onMounted, computed} from "vue";
import {cardData, Options} from './interfaces.ts'
import DropDown from "./components/dropDown.vue";


const items = ref<cardData[]>(itemsData)

const filterMaterialId = ref<number | null>(null);
const sortOrder = ref<'default' | 'asc' | 'desc'>('default');
const orderFilters: Options[] = [
  {
    text: 'По убыванию',
    option: 'desc'
  },
  {
    text: 'По возрастанию',
    option: 'asc',
  },
]
const orderMaterialFilters: Options[] = [
  {
    text: 'Все',
    option: 0,
  },
  {
    text: 'Материал 1',
    option: 1,
  },
  {
    text: 'Материал 2',
    option: 2,
  },
]

const filteredItems = computed((): CardData[] => {
  let filtered = items.value;

  if (Number(filterMaterialId.value) !== 0) {
    filtered = filtered.filter(item => item.material === Number(filterMaterialId.value));
  }

  if (sortOrder.value === 'desc') {
    filtered = filtered.sort((a, b) => a.price.current_price - b.price.current_price);
  }
  else if (sortOrder.value === 'asc') {
    filtered = filtered.sort((a, b) => b.price.current_price - a.price.current_price);
  }

  return filtered;
});

function setMaterial(option: number) {
  console.log(option)
  filterMaterialId.value = option
}
</script>

<template>
  <div class="container">
    <div class="catalog__breadcrumbs">
      <div class="catalog__breadcrumbs-item">
        Главная
      </div>
      <div class="catalog__breadcrumbs-item">
        Системы хранения
      </div>
      <div class="catalog__breadcrumbs-item">
        Комплекты стеллажных систем
      </div>
    </div>
    <h1 class="catalog__title">
      Комплекты стеллажных систем
    </h1>
    <div class="catalog__filters">
      <DropDown :defaultFilter="'По умолчанию' " v-model="sortOrder" :options="orderFilters" :title="'Сортировать по'"/>
      <DropDown :defaultFilter="'Все'" v-model="filterMaterialId" :options="orderMaterialFilters" :title="'Материал'"/>
    </div>
    <catalog-grid :items="filteredItems"/>
  </div>

</template>

<style lang="sass" scoped>
.container
  max-width: 1440px
  padding: 32px
  margin: 0 auto


.catalog
  &__filters
    display: flex
    gap: 24px
    margin-bottom: 64px

  &__title
    font-size: 36px
    margin-bottom: 32px

  &__breadcrumbs
    display: flex
    gap: 8px
    margin-bottom: 32px

    &-item
      font-size: 16px
      color: #727783

      &:after
        margin-left: 8px
        content: '/ '

      &:last-child
        color: black

        &:after
          content: ''
</style>
