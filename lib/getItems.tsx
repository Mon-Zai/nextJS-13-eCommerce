export default async function getItems(id: string) : Promise<any> {
    try {
        const response = await fetch(`/api/item/${id}/`, {

            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const items = await response.json();
        return items
    } catch (error) {
        console.error("An error occurred during item fetch:", error);
        throw error;
    }
};