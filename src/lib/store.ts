import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./features/todos/todosSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { todos: todosReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
