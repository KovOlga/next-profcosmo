"use client";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };
  return (
    <main className={styles.main}>
      <h2>Вы уверены, что хотите разлогиниться?</h2>
      <button type="button" onClick={handleLogout} className={styles.button}>
        Да, уверен!
      </button>
    </main>
  );
}
