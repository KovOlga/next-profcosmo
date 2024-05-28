import { IToDoItem } from "@/types/data";
import { mockTodos } from "@/utils/mock";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  todos: IToDoItem[];
}

const initialState: IAuthState = {
  todos: mockTodos,
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
        status: "не выполнена",
        uniqueId: nanoid(),
        id: state.todos.length,
      };
      state.todos.unshift(newTodo);
    },
  },
});

export const { logout, addTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
