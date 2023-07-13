'use client'

import { createContext, useEffect, useState } from "react";
import getCart from "../../../lib/getCart";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import getItems from "../../../lib/getItems";

export const CartContext = createContext({
    cartQuantity: 0,
    setCartQuantity(quantity: number) { },
    items:[],
    setItems(array:any[]) { }
});

export function CartProvider({ children }: {
    children: React.ReactNode
}) {
    const { status, data: session } = useSession();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items.length === 0) {
            setItems([])
            cartSetup();
        }
    }, [session])
    useEffect(() => {

        setItems([])
        cartSetup();

    }, [cartQuantity])
    useEffect(() => {
        console.log('quantity changed')
    }, [cartQuantity])
    async function cartSetup() {
        if (!session?.user) {
            setCartQuantity(0)
            return
        }
        const userCart = await getCart(session.user.id);
        console.log("CART PROVIDER cart fetch id: " + userCart.id)
        if (userCart === 'Card is Empty') {
            console.log("cart not found");
            return
        }
        const cartItems = await getItems(userCart.id);
        console.log("Product items cartItems id: " + JSON.stringify(cartItems));
        cartItems.map((item) => (
            setItems(prev => [...prev, item])
        ))
        items.map((item) =>
            console.log("item: " + item)
        )
    }
    return (
        <CartContext.Provider value={{ cartQuantity, setCartQuantity, items, setItems }}>
            {children}
        </CartContext.Provider>
    );
}
