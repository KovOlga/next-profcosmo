"use client";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { setCookie } from "../../utils/actions";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Roles } from "@/types/data";

export default function LoginPage() {
  const router = useRouter();
  const users = useAppSelector((state: RootState) => state.todos.users);

  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    router.push("/login");
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
        localStorage.setItem("role", Roles.USER);
      } else {
        localStorage.setItem("role", Roles.ADMIN);
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
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        {error && <p>Пароль и email не совпадают или вы не зарегистрированы</p>}
      </form>
    </main>
  );
}
