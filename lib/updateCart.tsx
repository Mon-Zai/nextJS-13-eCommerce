
type cartItem = {
    
    name:string,
    image: string,
    product_id: string,
    quantity: number,
    description: string,
    price:number,
    user_id: string,
    totalprice:number
}

export default async function updateCart({ name, image, product_id, quantity, price, description, user_id,totalprice }: cartItem){
    const data = {
        name:name,
        image: image,
        product_id: product_id,
        quantity: quantity,
        description: description,
        price:price,
        user_id: user_id,
        totalprice:totalprice
      };
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here', // If authentication is required
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log("PRODUCT ITEM OPERATION: " + result.message);
    }catch(error){
        console.error("Error at cart update: "+error);
    }

}