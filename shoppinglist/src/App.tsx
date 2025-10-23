import { Container,AppBar,Toolbar,Typography,List,ListItem,ListItemText,CircularProgress,Alert,} from "@mui/material";
import AddItem from "./addItem";

import { useQuery,QueryClient,QueryClientProvider,} from "@tanstack/react-query";
import { getShoppingItem, addShoppingItem } from "./shoppingapi";


export type Item = {
  product: string;
  amount: string;
};

// ----------------------------------------------------------------------
// 1. App 컴포넌트 (useQuery를 올바르게 사용)
// ----------------------------------------------------------------------
function App() {
  // ⚠️ [1] 로컬 상태 관리(useState)는 제거하고 useQuery로 서버 데이터를 가져옵니다.
  const {
    data: items,
    isLoading,
    error,
    refetch,
  } = useQuery({
    // 💡 queryFn: getShoppingItem을 사용해도 무방하지만, 복수형 함수명인 getShoppingItems로 통일하는 것이 RESTful에 적합합니다.
    queryKey: ["shoppingList"],
    queryFn: getShoppingItem,
  });

  // 💡 [2] 항목 추가 함수에 API 호출 로직을 통합
  const addItem = async (item: Item) => {
    const newItem = { name: item.product, amount: item.amount };
    try {
      await addShoppingItem(newItem);
      refetch(); 
    } catch (e) {
      console.error(e);
    }
  };

  const shoppingItems = items || [];

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            쇼핑 리스트 Shopping List
            </Typography>
        </Toolbar>
      </AppBar>
      <AddItem addItem={addItem} />
      <List> 
        {shoppingItems.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText
            primary={item.name}
            secondary={item.amount}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
const queryClient = new QueryClient();

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
