

export default async function getProducts(dataArray: string[]): Promise<any> {

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataArray),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('An error occurred during the POST request:', error);
      throw error;
    }
  }
/*
export default async function getProduct(ids:string[]) {
    try {
        const response = await fetch(`/api/product/${ids}/`, {

            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const products = await response.json();
        console.log("Product: " + products)
        return products
    } catch (error) {
        console.error("An error occurred during product fetch:", error);
        throw error;
    }
}
*/