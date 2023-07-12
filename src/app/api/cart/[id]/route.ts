import { prisma } from "@/db";
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    // Code to fetch item data based on the userID
    try {
        const user_id = params.id;
        console.log("API ID: " + user_id)
        const userCart = await prisma.cart.findUnique({
            where: {
                user_id: user_id
            }
        })
        if (userCart != null) {
            console.log('Cart: ' + userCart)
            return NextResponse.json(userCart);

        } else {
            return NextResponse.json({ product_id: 'Card is Empty' });

        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
/**
 
    try{
        const user_id = await request.json();
        console.log("api user"+user_id)
        const userCart = await prisma.cart.findUnique({
            where: {
                user_id: user_id
            }
        })
        if(userCart!=null){
            console.log('Cart: '+userCart)
            return NextResponse.json(userCart);
        }else{
            return NextResponse.json({ message: 'Cart not found' });
   
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }

 */