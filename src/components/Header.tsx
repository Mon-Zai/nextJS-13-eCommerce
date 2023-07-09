'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";


export default function Header() {
    const { status, data: session } = useSession();

    return (
        <div className="sticky top-0 p-6 bg-white border-b border-solid border-blue-900 
        shadow-md z-50  flex item-center justify-between flex-col -translate-x-2">
            <nav className="flex h-12 items-center px-4 justify-between">
                <Link href="/" className="text-2xl sm:text-3xl md:text-4xl sm:p-8">
                    TPO
                </Link>
                <div className="flex items-center z-10">
                    <div className="p-2">
                        <Link href="/Cart" className="p-2">
                            Cart
                        </Link>
                    </div>
                    {status === 'loading' ? ('Loading')
                        : session?.user ?
                            (<UserMenu session={session} />) :
                            (<Link href="/SignIn">Sign In</Link>)
                    }
                </div>
            </nav>
        </div>

    )
}



/*

 {cartItems.length>0 && (
*/
