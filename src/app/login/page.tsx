"use client";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { setCookie } from "../../utils/actions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Roles } from "@/types/data";
import { registerRole } from "@/lib/features/todos/todosSlice";

const regexp = /^[0-9]+$/gm;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const users = useAppSelector((state: RootState) => state.todos.users);

  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    router.push("/login");
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setError(false);
      setForm((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    if (e.target.name === "password") {
      if (e.target.value.match(regexp) || e.target.value === "") {
        setError(false);
        setInputError(false);
        setForm((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      } else {
        setInputError(true);
      }
    }
  };

  const verifyUserPass = () => {
    const userExist = users.find((user) => user.email === form.email);
    if (!userExist) {
      return false;
    }
    const isPasswordAlright = userExist.password.toString() === form.password;
    if (!isPasswordAlright) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (verifyUserPass()) {
      if (form.email.includes(Roles.USER)) {
        dispatch(registerRole("user"));
      } else {
        dispatch(registerRole("admin"));
      }
      setCookie();
      router.replace("/");
    } else {
      setError(true);
    }
  };
  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Авторизуйтесь</h2>
        <input
          className={styles.form__input}
          type="email"
          placeholder="Email"
          required
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          className={styles.form__input}
          type="text"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.form__button}>
          Login
        </button>
        {error && <p>Пароль и email не совпадают или вы не зарегистрированы</p>}
        {inputError && <p>В пароле должны быть только цифры</p>}
      </form>
    </main>
  );
}
