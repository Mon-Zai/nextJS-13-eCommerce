'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartProvider";


export default function Header() {
    const { status, data: session } = useSession();
    const { cartProducts } = useContext(CartContext)

    return (
        <div className="sticky top-0 p-6 bg-white border-b border-solid border-blue-900 
        shadow-md z-50  flex item-center justify-between flex-col -translate-x-2">
            <nav className="flex h-12 items-center px-4 justify-between">
                <Link href="/" className="text-2xl sm:text-3xl md:text-4xl sm:p-8">
                    TPO
                </Link>
                <div className="flex items-center z-10">
                    {status === 'loading' ? ('Loading')
                        : session?.user ?
                            (<UserMenu session={session} />) :
                            (<Link href="/SignIn">Sign In</Link>)
                    }
                    <div className="p-2">
                        <Link href="/Cart" className="p-2">
                            Cart
                        </Link>

                        {session?.user!=null  && (
                            <span className="ml-1 rounded-full bg-white-600 px-2 py-1 text-xm font-bold text-black shadow">
                                {cartProducts?.length}
                            </span>
                        )}
                    


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
