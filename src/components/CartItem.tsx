import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import updateCart from "../../lib/updateCart"
import { CartContext } from "./context/CartProvider"
import './Cart.component.css'
import './ProductItem.component.css'
type cartItem = {
    id: string
    name: string
    image: string
    product_id: string
    quantity: number
    cart_id: string
    price: number
    totalprice: number
    description: string
}


export default function CartItem({ name, image, product_id, quantity, totalprice, description, price }: cartItem) {
    const { status, data: session } = useSession();
    const { items, setItems, setCartQuantity, cartQuantity } = useContext(CartContext)
    const [count, setCount] = useState(0)


    async function cartSubmit() {
        if (count === 0) {
            return
        }
        if (!session?.user) {
            console.log("CART UPDATE")
            return
        }
        let auxPrice = price
        if (count < 0) {
            auxPrice *= -1;
        }
        const data = {
            name: name,
            image: image,
            product_id: product_id,
            quantity: count,
            description: description,
            price: auxPrice,
            user_id: session.user.id,
            totalprice: totalprice
        };
        await updateCart(data);
        setCartQuantity(cartQuantity - 1)
        setCount(0)
    }

    function avoidMin() {
        if (count <= -quantity) {
            alert("Cannot remove more products from cart");
            setCount(-quantity);
        } else {
            setCount(count - 1);
        }
    }
    return (
        <tbody className="">
            <tr className="content-center h-10">
                <td>
                    <img
                        className="img-h"
                        src={image}

                    >
                    </img>
                    <h2 className="text-left px-36">{name}</h2>
                </td>
                <td className="">
                    <h3 className="text-center font-bold">{quantity}</h3>
                </td>
                <td className="text-center">
                    <h3 className="text-center font-bold">{totalprice}</h3>
                </td>
                <td className="text-center pt-8">
                    <div className="self-center my-4">
                        <button className="title modifier w-9" onClick={() => avoidMin()}>
                            <span className="px-2 py-4 text-xm font-bold text-white">-</span>
                        </button>
                        <input className="text-center w-8 title" readOnly value={count} />
                        <button className="title modifier w-9 " onClick={() => setCount(count + 1)}>
                            <span className="px-2 py-4 text-xm font-bold text-white">+</span>
                        </button>
                    </div>
                    <div className="options">
                        <button className=" button add" onClick={() => cartSubmit()}>Accept</button>
                    </div>
                </td>
            </tr>

        </tbody>
    )
}