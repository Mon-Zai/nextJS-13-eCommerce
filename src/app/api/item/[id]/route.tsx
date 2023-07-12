import { prisma } from "@/db";
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    // Code to fetch item data based on the userID
    try {
        const cart_id = params.id;
        console.log("API CART ID: " + cart_id)
        const items = await prisma.item.findMany({
            where: {
                cart_id: cart_id
            }
        })
        if (items != null) {
            console.log('API ITEM: ' + items)
            return NextResponse.json(items);

        } else {
            return NextResponse.json({ message: 'Item not found' });

        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}