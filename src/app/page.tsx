"use client";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Pagination from "@/components/pagination";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { addTodo } from "@/lib/features/todos/todosSlice";

export default function Home() {
  const todosArr = useAppSelector((state: RootState) => state.todos.todos);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    title: "",
    email: "",
    body: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(addTodo(form));
  };
  return (
    <main className={styles.main}>
      <button className={styles.button}>Logout</button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Добавить задачу</h2>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Название задачи"
          required
          minLength={3}
          maxLength={25}
          value={form.title}
          onChange={handleInputChange}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          required
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Текст задачи"
          name="body"
          value={form.body}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.button}>
          Добавить
        </button>
      </form>
      <ul className={styles.list}>
        {todosArr &&
          todosArr.map((item) => {
            return (
              <li className={styles.list__item} key={item.uniqueId}>
                <p>{item.title}</p>
                <p>{item.body}</p>
                <p>{item.status}</p>
                <p>{item.email}</p>
              </li>
            );
          })}
      </ul>
      <Pagination pages={3} />
    </main>
  );
}
