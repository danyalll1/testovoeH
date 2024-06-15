import {defineStore} from "pinia";
import {ref} from "vue";
export const useUserCards = defineStore('userCards', () => {

    const likesInStorage = ref<String>('')
    const itemsInCart = ref<String>('')

    const getLikesFromStorage = () =>  {
        likesInStorage.value = localStorage.getItem('likes')
    }
    const getItemsFromStorage = () =>  likesInStorage.value = localStorage.getItem('cart')

    const setInStorage= (key,id) =>{
        localStorage.setItem(`${key}`, `${id}`)
        getLikesFromStorage()
    }

    const initStorage = (key) =>{
        setInStorage(key, ' ')
    }


    return { likesInStorage, itemsInCart, setInStorage , getLikesFromStorage, initStorage }
})