
import { List, ListItem, ListItemText } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddItem from "./addItem"; 
import { getShoppingItem, addShoppingItem } from "./shoppingapi";

// 💡 타입 정의
export type ItemForm = { 
    product: string;
    amount: string;
};

function ShoppingList() {
    const queryClient = useQueryClient();

    const { data: items } = useQuery({
        queryKey: ["shoppingList"],
        queryFn: getShoppingItem,
        });

    const { mutate } = useMutation({
        mutationFn: addShoppingItem,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const addItem = (item: ItemForm) => {
        const newItem = { name: item.product, amount: item.amount };
        mutate(newItem); 
    };

    const shoppingItems = items || [];

    return (
    <>
        <AddItem addItem={addItem} />
        <List> 
            {shoppingItems.map((item) => (
                <ListItem key={item.id} divider>
                    <ListItemText primary={item.name} secondary={item.amount} />
                </ListItem>
            ))}
        </List>
    </>
    );
}

export default ShoppingList;