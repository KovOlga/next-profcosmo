export interface IToDoItem {
  uniqueId: string;
  id: number;
  title: string;
  email: string;
  body: string;
  status: string;
}

export interface IUser {
  email: string;
  password: number;
}
