<script setup lang="ts">
import {cardData} from '../interfaces.ts'
import {computed, ref, onMounted} from "vue";
import {useUserCards} from "../store.ts";

defineProps<{
  item: cardData
}>()


const itemsInCart = ref<String>(' ')
const STORE  = useUserCards()

function clickHandlerLike(id:number) {

  if(!STORE.likesInStorage){
    STORE.setInStorage('likes',id)
    localStorage.setItem('likes',`${id}`)
  }
  else{
    if(STORE.likesInStorage.includes(id)){
      STORE.setInStorage('likes',STORE.likesInStorage.replace(`${id}`, ''))
      STORE.likesInStorage = STORE.likesInStorage.replace(`${id}`, '')
    }
    else{
      STORE.likesInStorage += `${id}`
      STORE.setInStorage('likes',STORE.likesInStorage)

    }
  }
}
function clickHandlerCart(id:number){
  let cart:string = localStorage.getItem('cart')
  if(!cart){
    localStorage.setItem('cart',`${id},`)
    itemsInCart.value = `${id},`
  }
  else{
    if(cart.includes(id)){
      localStorage.setItem('cart',cart.replace(`${id},`, ''))
      itemsInCart.value = cart.replace(`${id},`, '')
    }
    else{
      cart += `${id},`
      localStorage.setItem('cart',cart)
      itemsInCart.value = cart
    }
  }
}

onMounted(()=>{
  STORE.getLikesFromStorage()
    if(!STORE.likesInStorage)
      STORE.initStorage('likes')
  itemsInCart.value = localStorage.getItem('cart')
})

</script>

<template>
  <div class="card">
    <div v-if="item.price.old_price" class="card__inStockFlag">Скидка</div>
    <div class="card__top">
      <div class="card__image-container">
        <img class="card__image" :src="'/src/assets/images/'+ item.image.url" alt="item image">
      </div>
    </div>
    <div class="card__bottom">
      <div v-if="item.code" class="card__code">
        {{ item.code }}
      </div>
      <div class="card__title">
        {{ item.name }}
      </div>
      <div class="card__prices">
        <div v-if="item.price.old_price" class="card__prices-price card__prices-price_old">{{ item.price.old_price }}
        </div>
        <div class="card__prices-price">{{ item.price.current_price }}</div>
      </div>
      <svg @click="clickHandlerLike(item.id)" :class="{active : STORE.likesInStorage.includes(`${item.id}`)}" class="icon card__icon card__icon_like">
        <use href="/src/assets/sprite.svg#1"/>
      </svg>
      <div @click="clickHandlerCart(item.id)" class="card__item-container">

        <svg v-if="itemsInCart.includes(`${item.id}`)" class="icon card__icon card__icon_grab">
          <use href="/src/assets/sprite.svg#2"/>
        </svg>
        <svg v-else class="icon card__icon card__icon_cart">
          <use href="/src/assets/sprite.svg#3"/>
        </svg>
      </div>
    </div>
  </div>

</template>

<style lang="sass" scoped>
.card
  border: 1px solid #EEEEEE
  position: relative
  padding: 10px 14px
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between

  &__inStockFlag
    position: absolute
    background-color: #EB5757
    left: 0
    top: 8px
    color: #FFFFFF
    padding: 4px 16px

  &__image
    object-fit: contain

    &-container
      display: flex
      width: 100%
      justify-content: center

  &__code
    font-size: 10px
    line-height: 15px
    color: #888888

  &__title
    margin-top: 6px
    font-size: 16px
    line-height: 22px
    font-weight: 600

  &__prices
    display: flex
    gap: 10px

    &-price
      font-size: 16px
      font-weight: 500
      line-height: 22px

      &_old
        position: relative
        color: #888888

        &:after
          width: 100%
          height: 0.5px
          left: 1px
          content: ' '
          background-color: #888888
          position: absolute
          top: 50%
          transform: translateY(-50%)

  &__icon
    cursor: pointer
    position: absolute
    bottom: 4px

    &_cart
      right: 61px

    &_grab
      right: 61px

    &_like
      right: 22px

      &.active
        fill: red

</style>
