'use client'

import { createContext, useEffect, useState } from "react";
import getCart from "../../../lib/getCart";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import getItems from "../../../lib/getItems";

export const CartContext = createContext({
    cartProducts:[],
    setCartProducts(cart:string[]){},

});

export function CartProvider({ children }: {
    children: React.ReactNode
}) {
    const { status, data: session } = useSession();
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(()=>{
        if(cartProducts.length===0){
         cartSetup();
        }
     },[session])
    async function cartSetup(){
        if(!session?.user){
           setCartProducts([])
            return
        }
        const cartFetch = await getCart(session.user.id);
        console.log("CART PROVIDER cart fetch id: "+cartFetch.id)
        if(cartFetch==='Card is Empty'){
            console.log("cart not found");
            return
        }
        const itemsFetch = await getItems(cartFetch.id)
        console.log("CART PROVIDER items fetch id: "+JSON.stringify(itemsFetch));

        itemsFetch.map(item=>(
            console.log('quantity: '+item.quantity)
          ))
        //setCartProducts(cartToArray);
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts}}>
            {children}
        </CartContext.Provider>
    );
}