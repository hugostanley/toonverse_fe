import { useFetch } from "@hooks";
import { ALL_ITEMS } from "./endpoints";



export const createItem = async (ItemData: any | null) => {
  const { fetchData } = useFetch();
  return await fetchData(ALL_ITEMS, { method: "GET", data: ItemData });
};
