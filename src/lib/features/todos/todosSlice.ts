import { IToDoItem, IUser, ToDoStatus } from "@/types/data";
import { mockTodos, mockUsers } from "@/utils/mock";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  todos: IToDoItem[];
  users: IUser[];
  role: string | null;
}

const initialState: IAuthState = {
  todos: mockTodos,
  users: mockUsers,
  role: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<any>) => {
      const newTodo: IToDoItem = {
        ...action.payload,
        status: ToDoStatus.NOTDONE,
        uniqueId: nanoid(),
        id: state.todos.length + 1,
        body: "_",
      };
      state.todos.push(newTodo);
    },
    updateTodo: (state, action: PayloadAction<IToDoItem>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
    registerRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
  },
});

export const { addTodo, updateTodo, registerRole } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
