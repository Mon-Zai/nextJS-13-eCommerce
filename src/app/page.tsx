import { prisma } from '@/db'
import ProductItem from '@/components/ProductItem.component';


async function getProducts(){
  return await prisma.product.findMany();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {products.map(product=>(
          <ProductItem key={product.id} {...product}
          />
        ))}
      </div>
    </main>
  )
}
/**
 * 
 *  await prisma.product.create({
    data: {
        id:'banana',
        name:'Banana',
        category:'Food',
        image:'/images/banana.png',
        price:10,
        countInStock:20,
        description:'A banana',
        isFeatured:true,
        banner:'/images/bananabanner.png'
    },
  });
 */