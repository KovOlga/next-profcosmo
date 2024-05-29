export interface IToDoItem {
  uniqueId: string;
  id: number;
  title: string;
  email: string;
  body: string;
  status: ToDoStatus;
}

export interface IUser {
  email: string;
  password: number;
}

export enum ToDoStatus {
  DONE = "выполнена",
  NOTDONE = "не выполнена",
}

export enum Roles {
  ADMIN = "admin",
  USER = "user",
}
