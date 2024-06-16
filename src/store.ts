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

    const includesLikes = (value)=>{
        return likesInStorage.value.includes(`${value}`)
    }


    const includesCart = (value)=>{
        return itemsInCart.value.includes(`${value}`)
    }

    return { likesInStorage, itemsInCart, setInStorage , getLikesFromStorage, initStorage, includesLikes , includesCart }
})