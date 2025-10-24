import axios, { AxiosRequestConfig } from "axios";
import { Todo, TodoEntity, TodoResponse } from "../assets/type";

const getAxiosConfig = () : AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt')?.replace('Bearer ', '');

  return {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  };
};

export const getTodos = async (): Promise<TodoResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`, getAxiosConfig());
  return response.data._embedded.todos;
}

export const deleteTodos = async (link: string): Promise<TodoResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const addTodos = async (todo: Todo): Promise<TodoResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos`,todo,getAxiosConfig());
  return response.data;
};

export const updateTodos = async (todoEntity: TodoEntity): Promise<TodoResponse> => {
  const response = await axios.put(todoEntity.url, todoEntity.todo, getAxiosConfig());
  return response.data;
};

export const completedTodo = async (todoUrl: string): Promise<TodoResponse> => {
  const response = await axios.patch(`${todoUrl}/toggle`, {}, getAxiosConfig());
  return response.data;
}