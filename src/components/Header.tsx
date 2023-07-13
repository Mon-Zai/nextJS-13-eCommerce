'use client'


import './Header.component.css'
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartProvider";


export default function Header() {
    const { status, data: session } = useSession();
    const { cartQuantity, items } = useContext(CartContext)
    useEffect(() => {
        console.log('Should update')
    }, [items])
    return (
        <div className="sticky top-0 p-6 border-solid border-black-900 
        shadow-md z-50  flex item-center justify-between flex-col header">
            <nav className="flex h-12 items-center px-4 justify-between">
                <Link href="/" className="text-3x2 sm:text-3xl md:text-4xl sm:p-8 align-middle title">
                    Ecommerce
                </Link>
                <div className="flex items-center z-10">
                    <div className='item'>
                    {status === 'loading' ? ('Loading')
                        : session?.user ?
                            (<UserMenu session={session} />) :
                            (<Link href="/SignIn">Sign In</Link>)
                    }
                    </div>
                    <div className="p-2 item">
                        <Link href="/Cart" className="p-2">
                            Cart
                        </Link>
                        {session?.user != null &&
                            items.length > 0 && (
                                <span className="ml-1 rounded-full px-2 py-1 text-xm font-bold shadow cart-count">
                                    {items.reduce((a, c) => a + c.quantity, 0)}
                                </span>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>

    )
}



/*
  useEffect(() => {
        if (!session?.user) {
            return
        }
        const id = session.user.id
        getProducts(id);
    })

*/
