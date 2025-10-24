import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react"
import { addTodos } from "../api/todoapi";
import { Todo } from "../assets/type";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

function AddTodo() {
  const [ open, setOpen ] = useState(false);
  const [ todo, setTodo ] = useState({
    id: 0,
    content: '',
    isCompleted: false,
  });

  const handleClickOpen = () => setOpen(true);

  const handleClickClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: err => {
      console.log(err);
    },
  });

  const handleSave = () => {
    mutate(todo);
    setTodo({
      id: 0,
      content: '',
      isCompleted: false
    });
    handleClickClose();
  }

  return(
  <>
    {/* <button onClick={handleClickOpen} variant="outlined">New Todo</button>
    <Dialog open={open}>
      <DialogTitle>New Todo</DialogTitle>  
      <TodoDialogContent todo={todo} handleChange={handleChange}/>
      <DialogActions>
        <Button onClick={handleClickClose}>Cancel  취소</Button>
        <Button onClick={handleSave}>Save  저장</Button>
      </DialogActions>
    <Dialog/> */}
  </>
  );
}

export default AddTodo;