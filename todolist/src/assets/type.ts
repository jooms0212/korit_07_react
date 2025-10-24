export type TodoResponse = {
  id: number;
  content: string;
  isCompleted: boolean;

  _links: {
    self: {
      href: string;
    },
    todo: {
      href: string;
    },
    user: {
      href: string;
    }
  }
}

export type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export type TodoEntity = {
  todo: Todo;
  url: string;
}
