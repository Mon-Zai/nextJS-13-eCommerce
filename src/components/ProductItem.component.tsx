
'use client'
import { useContext } from 'react'
import './ProductItem.component.css'
import { useSession } from 'next-auth/react'
import { CartContext } from './context/CartProvider'
import getCartProducts from '../../lib/getCartProducts'


type ProductProps = {
    id: string
    name: string
    category: string
    image: string
    price: number
    countInStock: number
    description: string
    isFeatured: boolean
    banner: string
}


export default function ProductItem({ id, name, category, image, price, countInStock, description, isFeatured, banner, }: ProductProps){ 

    const { status, data: session } = useSession();
    const {cartProducts,setCartProducts} =useContext(CartContext)

    async function  addToCart() {
        if(!session?.user){
            alert('Please sign in to add products');
            return
        }
        const data = {
            user_id :session.user.id,
            product_id:id
        };
    
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer your_token_here', // If authentication is required
            },
            body: JSON.stringify(data),
          });
  
          const result = await response.json();
          console.log("(PRODUCT ITEM)"+result);
          const cartFetch = await getCartProducts(data.user_id);
          console.log("Cart Fetch (PRODUCT ITEM): "+cartFetch)
          const cartToArray = JSON.stringify(cartFetch).split(',');
          setCartProducts(cartToArray)
        } catch (error) {
          console.error(error);
        }
      };
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