import { AppBar, Toolbar, Typography, Container, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todolist from "./components/todolist";

const queryClient = new QueryClient();

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo List</Typography>
        </Toolbar>
        <QueryClientProvider client={queryClient}>
          <Todolist/>
        </QueryClientProvider>
      </AppBar>
    </Container>
  );
}

export default App;
