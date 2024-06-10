"use client";
import { useEffect } from "react";
import { deleteCookie } from "../../utils/actions";
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
    <main className="mt-16 flex flex-col items-center gap-5">
      <h2>Вы уверены, что хотите разлогиниться?</h2>
      <button
        type="button"
        onClick={handleLogout}
        className="border border-solid border-teal-400 bg-none px-4 py-3 text-teal-400"
      >
        Да!
      </button>
    </main>
  );
}
