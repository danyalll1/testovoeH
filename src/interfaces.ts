interface cardData {
    id: number,
    name: String,
    code?:String,
    price:{
        old_price?:Number,
        current_price: Number,
    },
    image:{
        url:String,
    },
    material: Number
}

interface filter{
    material: Number
    direction: Number
}

interface Options {

    text:String
    option: String | Number | null
}

export type  {cardData , filter , Options}