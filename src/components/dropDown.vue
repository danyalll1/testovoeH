<script setup lang="ts">
import {ref} from "vue";
import {Options} from './../interfaces.ts'

const props = defineProps<{
  defaultFilter?: String
  title: String
  options: Options[]
  modelValue: String | number
}>()

const activeOption = ref(props.defaultFilter)

const emit = defineEmits(['update:modelValue'])


const isOpen = ref<Boolean>(false)

function dropOpen() {
  isOpen.value = !isOpen.value
}

function selectOptions(option) {
  emit('update:modelValue', option.option);
  activeOption.value = option.text
  dropOpen
}


</script>


<template>
  <div class="dropDown">
    <label>{{ title }}</label>
    <div class="dropDown__container" @click="dropOpen">
      <div class="dropDown__top">
        <div class="selected-value">{{ activeOption }}</div>
        <svg class="icon">
          <use href="/src/assets/sprite.svg#chevron"/>
        </svg>
      </div>
      <div v-if="isOpen" class="dropDown__options">
        <div
            @click="selectOptions(option)"
            class="dropDown__options-item"
            v-for="option in options"
            :key="option.value"
        >
          {{ option.text }}
        </div>
      </div>
    </div>

  </div>

</template>

<style lang="sass" scoped>
.dropDown
  width: 288px

  &__top
    display: flex
    align-items: center
    justify-content: space-between
    margin-top: 6px
    cursor: pointer
    padding: 10px 16px

  label
    font-size: 12px
    margin-bottom: 6px
    color: #4f4f4f

  .icon
    height: 24px
    width: 24px

  &__container
    background-color: #f2f2f2
    position: relative

  &__options
    position: absolute
    background-color: #f2f2f2
    width: 100%
    left: 0
    top: 100%
    z-index: 100

    &-item
      border-top: solid 1px #4f4f4f
      padding: 16px 10px
      cursor: pointer

      &:hover
        background-color: #ead9d9

      &.selected
        background-color: #f0f0f0

</style>