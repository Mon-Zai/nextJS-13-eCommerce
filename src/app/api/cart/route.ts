import { prisma } from '@/db'
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';
export async function POST(request: Request) {
    try {
        const { user_id, product_id, quantity, price, image, description,name } = await request.json();
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
                const updateItem= await prisma.item.update({
                    where: {
                        id:item.id,
                    },
                    data: {
                        quantity: {increment: quantity},
                        totalprice: {increment: price}
                    }
                })
                if(updateItem.quantity===0){
                    console.log("Item removal operation")
                    const idRemove= updateItem.id
                    await prisma.item.delete({
                        where:{
                            id:idRemove
                        }
                    })
                    await prisma.cart.update({
                        where:{
                            id:userCart.id
                        },
                        data:{
                            items: userCart.items.filter((id) => id !== idRemove), 
                        }
                    })
                }
                return NextResponse.json({message:'Item Quantity Changed'})
            }
            else {
                const newItem = await prisma.item.create({
                    data:{
                        name:name,
                        image:image,
                        product_id:product_id, 
                        quantity:quantity,
                        cart_id: userCart.id,
                        price:price,
                        totalprice:price,
                        description: description
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
                    name:name,
                    image:image,
                    product_id:product_id, 
                    quantity:quantity,
                    cart_id: newCart.id,
                    price:price,
                    totalprice:price,
                    description: description
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


