import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { product_id } = await request.json();
        const array: string[] = ['banana','banana','banana','banana']
        console.log('Product ID API: ' + product_id);
        console.log('API array: '+array[1]);
        console.log('API array length: '+array.length)

            let test:any[]=[];
            for(let i=0;i<array.length;i++){
                const val = await prisma.product.findMany({
                    where: {
                        id:array[i]
                    }})
                
                test.push(val);
            }
            console.log("FOR TEST: "+test);
        return NextResponse.json(test)

    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
