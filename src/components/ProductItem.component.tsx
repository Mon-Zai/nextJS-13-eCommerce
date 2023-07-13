
'use client'
import { useContext } from 'react'
import './ProductItem.component.css'
import { useSession } from 'next-auth/react'
import { CartContext } from './context/CartProvider'
import getCartProducts from '../../lib/getCart'
import getItems from '../../lib/getItems'
import updateCart from '../../lib/updateCart'


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


export default function ProductItem({ id, name, category, image, price, countInStock, description, isFeatured, banner, }: ProductProps) {

  const { status, data: session } = useSession();
  const { cartQuantity, setCartQuantity, items, setItems } = useContext(CartContext)

  async function addToCart() {
    if (!session?.user) {
      alert('Please sign in to add products');
      return
    }
    const data = {
      name: name,
      image: image,
      product_id: id,
      quantity: 1,
      description: description,
      price: price,
      user_id: session.user.id,
    };
    try {
      await updateCart(data);
      setCartQuantity(cartQuantity + 1)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='block rounded-lg border border-gray-200 shadow-md bg-white product mx-16'>
      <img
        className="rounded shadow object-cover w-full image"
        src={image}
      ></img>
      <div className="flex flex-col items-center justify-center p-5">
        <h2 className='title'>{name}</h2>
        <p className='mb-2'>{description}</p>
        <label className='price'>{price}$</label>
      </div>
      <div className='options'>
        <button className='button add' onClick={addToCart}>Add</button>
      </div>
    </div>

  )
}