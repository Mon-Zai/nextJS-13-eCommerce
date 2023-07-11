export default async function getCartProducts(id: string) {
    try {
        const response = await fetch(`/api/cart/${id}/`, {

            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        const cartProducts = result;
        console.log("CART PRODUCTS: " +  cartProducts);
        return cartProducts.product_id
    } catch (error) {
        console.error("An error occurred during cart fetch:", error);
        throw error;
    }
};