import { NewShoppingItem, ShoppingItem } from "./type";
import axios from "axios";



export const getShoppingItem = async (): Promise<ShoppingItem[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping`);
  return response.data
};

export const addShoppingItem = async (item: NewShoppingItem): Promise<ShoppingItem> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopping`,item,{
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteShopping = async (link: string): Promise<ShoppingItem> => {
  const response = await axios.delete(link)
  return response.data;
}