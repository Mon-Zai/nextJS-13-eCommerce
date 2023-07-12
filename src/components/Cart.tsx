import { useSession } from "next-auth/react";
import getCartProducts from "../../lib/getCart"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartProvider";




export default function Cart() {

    const { status, data: session } = useSession();

    const { cartProducts } = useContext(CartContext)
    const [products, setProducts] = useState([]);
    const { push } = useRouter();


    useEffect(() => {
        getItems();
    }, [])
    async function getItems() {
        try {
            if (!session?.user) {
                alert('Please sign in to view your cart');
                push('/');
                return
            }
            else if (cartProducts.length === 0) {
                console.log("Cart's empty");
                return
            }
            console.log("CART cart products: " + cartProducts)

            const data = {
                product_id: cartProducts
            }
            console.log("CART cart products: " + data)
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your_token_here', // If authentication is required
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Product data: ")
            setProducts(result.data);
        } catch (error) {

        }

    }
    return (

        <div>
            <div>

            </div>
        </div>
    )
}

/*
           const cartFetch= await getCartProducts(session?.user.id);
            if(cartFetch==='Card is Empty')
            {
                console.log("No items added yet");
                return
            }
            else{

            }

*/