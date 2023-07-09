import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export function CartProvider({ children }: {
    children: React.ReactNode
}) {
    const local = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState<string[]>([]);
    useEffect(() => {
        if (cartProducts?.length > 0) {
            local?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);
    useEffect(() => {
        const item = local?.getItem('cart');
        if (local && item) {
            setCartProducts(JSON.parse(item));
        }
    }, []);
    function addProduct(id: string) {
        setCartProducts(prev => [...prev, id]);
    }
    function removeProduct(id: string) {
        setCartProducts(prev => {
            const pos = prev.indexOf(id);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }
    function clearCart() {
        setCartProducts([]);
    }
    return (
        <Context.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </Context.Provider>
    );
}