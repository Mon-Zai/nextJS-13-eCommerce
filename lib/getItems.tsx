export default async function getItems(id: string) {
    try {
        const response = await fetch(`/api/item/${id}/`, {

            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const items = await response.json();
        console.log("ITEMS: " + items)
        return items
    } catch (error) {
        console.error("An error occurred during cart fetch:", error);
        throw error;
    }
};