import styles from "./page.module.scss";

export default function LogoutPage() {
  return (
    <main className={styles.main}>
      <h2>Вы уверены, что хотите разлогиниться?</h2>
      <button type="submit" className={styles.button}>
        Да, уверен!
      </button>
    </main>
  );
}
