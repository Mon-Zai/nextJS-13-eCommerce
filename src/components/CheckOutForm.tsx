'use client'
import { useContext, useState } from "react"
import { CartContext } from "./context/CartProvider"
import { Listbox } from '@headlessui/react'
import { useSession } from "next-auth/react";
import './Form.component.css'
import { useRouter } from "next/navigation";
export default function CheckOutForm() {

    const { status, data: session } = useSession();

    const{push} = useRouter();
    const { items,setCartQuantity,cartQuantity } = useContext(CartContext)
    const total = items.reduce((a, c) => a + c.totalprice, 0)
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [card, setCard] = useState('')

    const paymentMethod = [
        { id: 1, value: 'Credit Card' },
        { id: 2, value: 'Debit Card' },
        { id: 3, value: 'Cash' },
    ]
    const [method, setmethod] = useState(paymentMethod[0])
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const data = {
                user_id: session?.user.id,
                name: name,
                lastname: lastname,
                address: address,
                paymentmethod: method.value,
                cardnumber: card,
                items: JSON.stringify(items),
                total: total
            };
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your_token_here', // If authentication is required
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
            setCartQuantity(cartQuantity+1);
            alert('Purchase complete');
            push('/')
        } catch (error) {

        }
    };
    return (
        <div>
            <form
                className="mx-auto defaultForm max-w-screen-xl text-xl"
                id="signupForm"
                name="signupForm"
                onSubmit={handleSubmit}
            >
                <h1 className="mb-4 text-xl text-center">Checkout Form</h1>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="w-full my-6 text-center"
                    id="name"
                    name="name"
                    placeholder="Jhon"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                >
                </input>
                <label htmlFor="lastname">Lastname</label>
                <input
                    type="text"
                    className="w-full my-6 text-center"
                    id="lastname"
                    name="lastname"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(event) => setLastName(event.target.value)}
                >
                </input>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    className="w-full my-6 text-center"
                    id="address"
                    name="address"
                    placeholder="Random location"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                >
                </input>
                <label htmlFor="name">Payment Method</label>
                <div className="w-full bg-slate-500 my-6 rounded-md text-center">
                    <Listbox value={method} onChange={setmethod}>
                        <Listbox.Button>{method.value}</Listbox.Button>
                        <Listbox.Options>
                            {paymentMethod.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    value={option}
                                >
                                    {option.value}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
                {
                    method.value != 'Cash' && (
                        <input
                            type="text"
                            className="w-full my-6"
                            id="card"
                            name="card"
                            placeholder="0000-0000-0000-0000"
                            value={card}
                            onChange={(event) => setCard(event.target.value)}
                        >
                        </input>
                    )
                }
                <div className="mb-4">
                    <label htmlFor="total" className="font-bold">SUBTOTAL: </label>
                    <span className="text-center">{total}$</span>
                    <div className="mb-4 items-center text-center object-center">
                        <button type='submit' className="defaultButton">Submit Payment</button>
                    </div>
                </div>
            </form>
        </div>
    )

}