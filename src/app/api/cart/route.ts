import { prisma } from '@/db'
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';
export async function POST(request: Request) {
    try {
        const { user_id, product_id, quantity } = await request.json();
        console.log('User id: ' + user_id);
        console.log('Product id: ' + product_id);
        console.log('Quantity: ' + quantity);
        const item = {
            product_id: product_id,
            quantity: quantity
        }
        const userCart = await prisma.cart.findUnique({
            where: {
                user_id: user_id
            }
        })
        if (userCart != null) {
            const item = await prisma.item.findFirst({
                where:{
                    product_id: product_id,
                    cart_id:userCart.id
                }
            })
            if (item != null) {
                await prisma.item.update({
                    where: {
                        id:item.id,
                    },
                    data: {
                        quantity: {increment: quantity}
                    }
                })
                return NextResponse.json({message:'Item Quantity Changed'})
            }
            else {
                const newItem = await prisma.item.create({
                    data:{
                        product_id:product_id,
                        quantity:quantity,
                        cart_id: userCart.id
                    }
                })
                await prisma.cart.update({
                    where:{
                        id:userCart.id
                    },
                    data:{
                        items:{push: newItem.id} 
                    }
                })
                return NextResponse.json({message:'Item Added'})
            }
        }
        else {
           const newCart = await prisma.cart.create({
                data:{
                    user_id:user_id
                }
            })
            const newItem = await prisma.item.create({
                data:{
                    product_id:product_id,
                    quantity:quantity,
                    cart_id: newCart.id
                }
            })
            await prisma.cart.update({
                where:{
                    id:newCart.id
                },
                data:{
                    items:{push: newItem.id} 
                }
            })
            return NextResponse.json({message:'Cart Created'})
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}


/*
        if (userCart != null) {
            await prisma.cart.update({
                where: {
                    user_id: user_id,
                },
                data: {
                    product_id: {
                        push: product_id
                    }
                }
            })
            return NextResponse.json({ message: 'Cart Updated' });
        } else {
            await prisma.cart.create({
                data: {
                    user_id: user_id,
                    product_id: product_id
                }
            })
            return NextResponse.json({ message: 'Cart Created' });
        }
*/


