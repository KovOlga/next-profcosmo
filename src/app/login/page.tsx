"use client";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { setCookie } from "../actions";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    router.push("/login");
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setCookie();
    router.replace("/");
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
      </form>
    </main>
  );
}
