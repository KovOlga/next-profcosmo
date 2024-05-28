import { IToDoItem, IUser } from "@/types/data";
import { nanoid } from "@reduxjs/toolkit";

export const mockUsers: IUser[] = [
  { email: "user@user.com", password: 12345 },
  { email: "admin@admin.com", password: 67890 },
];

export const mockTodos: IToDoItem[] = [
  {
    uniqueId: nanoid(),
    id: 1,
    title: "todo1",
    email: "user@user.com",
    body: "body1",
    status: "status",
  },
  {
    uniqueId: nanoid(),
    id: 2,
    title: "todo2",
    email: "user@user.com",
    body: "body2",
    status: "status",
  },
  {
    uniqueId: nanoid(),
    id: 3,
    title: "todo3",
    email: "user@user.com",
    body: "body3",
    status: "status",
  },
  {
    uniqueId: nanoid(),
    id: 4,
    title: "todo4",
    email: "user@user.com",
    body: "body4",
    status: "status",
  },
  {
    uniqueId: nanoid(),
    id: 5,
    title: "todo5",
    email: "user@user.com",
    body: "body5",
    status: "status",
  },
  {
    uniqueId: nanoid(),
    id: 6,
    title: "todo6",
    email: "user@user.com",
    body: "body6",
    status: "status",
  },
  {
    uniqueId: nanoid(),
    id: 7,
    title: "todo7",
    email: "user@user.com",
    body: "body7",
    status: "status",
  },
];
