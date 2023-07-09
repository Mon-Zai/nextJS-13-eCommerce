
'use client'
import { toast } from 'react-toastify'
import './ProductItem.component.css'
import { useContext } from 'react'


type ProductProps = {
    id: string
    name: string
    category: string
    image: string
    price: number
    countInStock: number
    description: string
    isFeatured: boolean
    banner: String
}


export default function ProductItem({ id, name, category, image, price, countInStock, description, isFeatured, banner, }: ProductProps){ 

 const addToCart= async()=>{
   
 }
    return (
        <div className='product'>
            <img
                src={image}
            ></img>
            <h2>{name}</h2>
            <p>{description}</p>
            <label>{price}</label>
            <div className='options'>
                <button className='button add' onClick={addToCart}>Add</button>
            </div>
        </div>

    )
}