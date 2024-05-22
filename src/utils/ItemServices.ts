import { useFetch } from "@hooks";
import { ALL_ITEMS } from "./endpoints";



export const createItem = async (body: object | null) => {
  const { fetchData } = useFetch();
  try {
    const response = await fetchData(ALL_ITEMS, {
      method: 'POST',
      data: body,
    });
    console.log(response)
    return response; 
    // Return the response to indicate success
  } catch (error) {
    throw new Error; // Throw an error to handle failure
  }
}
