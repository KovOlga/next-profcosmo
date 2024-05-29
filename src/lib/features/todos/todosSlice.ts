import { IToDoItem, IUser, ToDoStatus } from "@/types/data";
import { mockTodos, mockUsers } from "@/utils/mock";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  todos: IToDoItem[];
  users: IUser[];
}

const initialState: IAuthState = {
  todos: mockTodos,
  users: mockUsers,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    addTodo: (state, action: PayloadAction<any>) => {
      const newTodo: IToDoItem = {
        ...action.payload,
        status: ToDoStatus.NOTDONE,
        uniqueId: nanoid(),
        id: state.todos.length + 1,
      };
      state.todos.unshift(newTodo);
    },
    updateTodo: (state, action: PayloadAction<IToDoItem>) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
  },
});

export const { logout, addTodo, updateTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
