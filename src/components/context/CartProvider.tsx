'use client'

import { createContext, useEffect, useState } from "react";
import getCartProducts from "../../../lib/getCartProducts";
import { useSession } from "next-auth/react";

export const CartContext = createContext({});

export function CartProvider({ children }: {
    children: React.ReactNode
}) {
    const { status, data: session } = useSession();
    const local = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);
    const [cartLenght, setCartLenght] = useState<number>(0)

    useEffect(()=>{
        updateCartLenght();
    },[session])
    useEffect(()=>{
        updateCartLenght();
    },[cartProducts])

    async function updateCartLenght(){
        if(!session?.user){
            setCartLenght(0)
            return
        }
        const cartFetch = await getCartProducts(session.user.id);
        console.log("Cart Fetch: "+cartFetch)
        if(cartFetch==='Card is Empty'){
            console.log("No items added yet");
            setCartLenght(0);
            return
        }
        const cartToArray = JSON.stringify(cartFetch).split(',');
        console.log("CartToArray: "+cartToArray)
        console.log("CartToArray lenght: "+cartToArray.length)
        setCartLenght(cartToArray.length);
        console.log("cart lenght: "+cartLenght)
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts,cartLenght}}>
            {children}
        </CartContext.Provider>
    );
}