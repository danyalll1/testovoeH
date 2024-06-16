import {defineStore} from "pinia";
import {ref} from "vue";
export const useUserCards = defineStore('userCards', () => {

    const likesInStorage = ref<any>('')
    const itemsInCart = ref<any>('')

    const getLikesFromStorage = () =>  {
        likesInStorage.value = localStorage.getItem('likes')
    }
    const getItemsFromStorage = () =>  itemsInCart.value = localStorage.getItem('cart')

    const setInStorage= (key:any,id:any) =>{
        localStorage.setItem(`${key}`, `${id}`)
        getLikesFromStorage()
    }

    const initStorage = (key:any) =>{
        setInStorage(key, ' ')
    }

    const includesLikes = (value:any)=>{
        return likesInStorage.value.includes(`${value}`)
    }

    const includesCart = (value:any)=>{
        return itemsInCart.value.includes(`${value}`)
    }

    return { likesInStorage, itemsInCart, setInStorage , getLikesFromStorage, getItemsFromStorage ,initStorage, includesLikes , includesCart }
})