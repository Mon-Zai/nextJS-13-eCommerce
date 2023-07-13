import { prisma } from "@/db";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const dataArray = await request.json(); // Assuming the request body contains the array

  try {
    const ids: string[] = []
    console.log("Received Array:", dataArray);
    dataArray.map((data: { product_id: string; })=>
        ids.push(data.product_id)
    )
    console.log("IDS: "+ids)
    // 
    const products = await prisma.product.findMany({
        where: {
            id: { in: ids }
        }
    });

    if (products.length > 0) {
        console.log('API PRODUCTS: ' + JSON.stringify(products));
        return NextResponse.json(products);
    } else {
        console.log('Product not found');
        return NextResponse.json({ message: 'Product not found' });
    }
} catch (error) {
    console.error(error);
    return NextResponse.error();
}
}


/*

import { prisma } from "@/db";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { ids: string[] } }) {

    // Code to fetch item data based on the userID
    try {
        const ids = params.ids;

        console.log("API PRODUCTS IDS: " + ids[0])

        const products = await prisma.product.findMany({
            where: {
                id: { in: ids }
            }
        });

        if (products.length > 0) {
            console.log('API PRODUCTS: ' + JSON.stringify(products));
            return NextResponse.json(products);
        } else {
            console.log('Product not found');
            return NextResponse.json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
*/