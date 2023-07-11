import { prisma } from '@/db'
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';

export async function POST(request: Request) {
    try {
        const { user_id,product_id } = await request.json();
        console.log('User id: ' + user_id);
        console.log('Product id: ' + product_id);


        const userCart = await prisma.cart.findUnique({
            where: {
                user_id: user_id
            }
        })

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
        
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}


/*
        await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: password
            }
        })
*/