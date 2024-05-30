"use client";
import { useEffect } from "react";
import { deleteCookie } from "../../utils/actions";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { registerRole } from "@/lib/features/todos/todosSlice";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    router.push("/logout");
  }, []);

  const handleLogout = () => {
    deleteCookie();
    dispatch(registerRole(null));
    router.replace("/login");
  };
  return (
    <main className={styles.main}>
      <h2>Вы уверены, что хотите разлогиниться?</h2>
      <button type="button" onClick={handleLogout} className={styles.button}>
        Да!
      </button>
    </main>
  );
}
