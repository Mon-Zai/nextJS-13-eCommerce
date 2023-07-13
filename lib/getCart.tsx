export default async function getCart(id: string) : Promise<any> {
    try {
        const response = await fetch(`/api/cart/${id}/`, {

            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const cart = await response.json();
        console.log("CART ID: "+cart.id)
        return cart
    } catch (error) {
        console.error("An error occurred during cart fetch:", error);
        throw error;
    }
};