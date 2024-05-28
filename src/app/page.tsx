"use client";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { addTodo } from "@/lib/features/todos/todosSlice";
import { Button, Pagination } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const todosArr = useAppSelector((state: RootState) => state.todos.todos);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleTodos, setVisibleTodos] = useState(todosArr.slice(0, 3));
  const [form, setForm] = useState({
    title: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    const updateVisible = [...todosArr].splice((currentPage - 1) * 3, 3);
    setVisibleTodos(updateVisible);
  }, [currentPage, todosArr]);

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
      <Link href="/logout" className={styles.link}>
        <button className={styles.button}>Logout</button>
      </Link>
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
      <Pagination
        total={Math.ceil(todosArr.length / 3)}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() => {
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
          }}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(todosArr.length / 3) ? prev + 1 : prev
            )
          }
        >
          Next
        </Button>
      </div>
      <ul className={styles.list}>
        {todosArr &&
          visibleTodos &&
          visibleTodos.map((item) => {
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
    </main>
  );
}
