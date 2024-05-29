import { IToDoItem, IUser, ToDoStatus } from "@/types/data";
import { nanoid } from "@reduxjs/toolkit";

export const mockUsers: IUser[] = [
  { email: "user@user.com", password: 12345 },
  { email: "admin@admin.com", password: 67890 },
];

export const mockTodos: IToDoItem[] = [
  {
    uniqueId: nanoid(),
    id: 1,
    title: "a",
    email: "user@user.com",
    body: "body1",
    status: ToDoStatus.DONE,
  },
  {
    uniqueId: nanoid(),
    id: 2,
    title: "b",
    email: "user@user.com",
    body: "body2",
    status: ToDoStatus.NOTDONE,
  },
  {
    uniqueId: nanoid(),
    id: 3,
    title: "todo3",
    email: "user@user.com",
    body: "body3",
    status: ToDoStatus.DONE,
  },
  {
    uniqueId: nanoid(),
    id: 4,
    title: "todo4",
    email: "user@user.com",
    body: "body4",
    status: ToDoStatus.NOTDONE,
  },
];
