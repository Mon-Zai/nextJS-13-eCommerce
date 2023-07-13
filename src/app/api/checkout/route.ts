import { prisma } from '@/db'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const item:string[]=[]
        const { user_id,name,lastname,address,paymentmethod,cardnumber,items,total} = await request.json();
        if(items.lenght===0){
            return NextResponse.json({ message: 'Bill could not be created, add items to your cart' });
        }
        await prisma.bill.create({
            data: {
                user_id:user_id,
                name: name,
                lastname:lastname,
                address:address,
                paymentmethod:paymentmethod,
                cardnumber:cardnumber,
                items:items,
                total:total
            }
        })
        const userCart = await prisma.cart.findUnique({
            where:{
                user_id:user_id
            }
        })
        await prisma.item.deleteMany({
            where:{
                cart_id:userCart?.id
            }
        })
        await prisma.cart.update({
            where:{
                user_id:user_id
            },
            data:{
                items:item
            }
        })
        return NextResponse.json({ message: 'Bill Created' });
      } catch (error) {
        console.error(error);
        return NextResponse.error();
      }
    }