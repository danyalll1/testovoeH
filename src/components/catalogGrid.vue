<script lang="ts" setup>
import {cardData} from '../interfaces.ts'
import ProductCard from "./productCard.vue";


defineProps<{
  items: cardData[]
}>()

</script>

<template>

<div class="grid">
 <product-card v-for="item in items" :item/>
</div>

</template>


<style lang="sass" scoped>

.grid
  display: grid
  grid-template-columns: repeat(4, minmax(260px, 336px))
  grid-column-gap: 48px
  grid-row-gap: 40px
  width: fit-content
  @media screen and (max-width: 1250px)
    grid-template-columns: repeat(3, minmax(260px, 336px))
  @media screen and (max-width: 960px)
    grid-template-columns: repeat(2, minmax(260px, 460px))
  @media screen and (max-width: 650px)
    grid-template-columns: repeat(1, minmax(260px, 600px))

</style>