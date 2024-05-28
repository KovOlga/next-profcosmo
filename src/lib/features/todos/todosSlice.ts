import { IToDoItem } from "@/types/data";
import { mockTodos } from "@/utils/mock";
import { createSlice } from "@reduxjs/toolkit";
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
    setAuthState: (state, action: PayloadAction<boolean>) => {
      //   state.authState = action.payload;
      return initialState;
    },
    logout: () => {
      return initialState;
    },
    addTodo: (state, action: PayloadAction<any>) => {
      const newTodo: IToDoItem = {
        ...action.payload,
        status: "не выполнена",
        id: state.todos.length,
      };
      state.todos.unshift(newTodo);
    },
  },
});

export const { setAuthState, logout, addTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
