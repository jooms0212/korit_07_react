import {Container, AppBar, Toolbar, Typography, CssBaseline,} from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ShoppingList from "./shoppinglist";


const queryClient = new QueryClient();

function App() {

  return (
    <Container maxWidth="md">
      <CssBaseline /> 
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">쇼핑 리스트 Shopping List</Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <ShoppingList/>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
