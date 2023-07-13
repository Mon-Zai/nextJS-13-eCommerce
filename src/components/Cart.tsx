import './Cart.component.css'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import { CartContext } from "./context/CartProvider";
import './ProductItem.component.css'
export default function Cart() {

    const { data: session } = useSession();
    const { items, setItems } = useContext(CartContext)

    const { push } = useRouter();

    return (
        <>
            <h1 className="mb-4 text-xl text-center font-bold">Cart</h1>
            {items.length === 0 ? (
                <div className='text-center cartEmpty'>
                   <span className=''> Cart is empty. <Link className=' text-blue-800 under' href="/">Go shopping</Link></span>
                </div>
            ) : (
                <div>
                    <div className=" mx-60 grid md:grid-cols-4 md:gap-5 ">
                        <div className=" inline-flex overflow-x-auto md:col-span-3">
                            <table className="min-w-full btable">
                                <thead className="">
                                    <tr className=" bg-white">
                                        <th className="p-5 px-40 text-left">Item</th>
                                        <th className="p-5 text-center">Quantity</th>
                                        <th className="p-5 text-center">Price</th>
                                        <th className="p-5 text-center">Action</th>
                                    </tr>
                                </thead>
                                {items.map(item => (
                                    <CartItem key={item.id}
                                        {...item}
                                    />
                                ))}
                            </table>
                        </div>
                        <div className=" grid-rows-2 bg-white checkout">
                            
                                
                                    <div className="pb-3 text-xl font-bold text-center">
                                        Subtotal ({items.reduce((a, c) => a + c.quantity, 0)}) : $
                                        {items.reduce((a, c) => a + c.totalprice, 0)}
                                    </div>
                                    <Link href={"/Checkout"}>
                                        <button
                                            className="checkbtn md:gap-4"
                                        >
                                            Check Out
                                        </button>
                                    </Link>
                                
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

/*
        <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
                {products.map(product => (
                    <CartItem key={product.id} {...product}
                    />
                ))}
            </div>
            <div>

            </div>
        </div>


*/