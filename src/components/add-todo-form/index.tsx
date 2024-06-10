import { Input } from "@nextui-org/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "@/lib/hooks";
import { addTodo } from "@/lib/features/todos/todosSlice";

const AddTodoForm: FC = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    title: "",
    email: "",
    body: "",
  });
  const [formError, setFormError] = useState({
    title: false,
    email: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.validity.valid && e.target.name === "title") {
      setFormError((prev) => {
        return { ...prev, title: true };
      });
    } else if (!e.target.validity.valid && e.target.name === "email") {
      setFormError((prev) => {
        return { ...prev, email: true };
      });
    } else {
      setFormError((prev) => {
        return { ...prev, title: false, email: false };
      });
    }
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (form.title === "") {
      setFormError((prev) => {
        return { ...prev, title: true };
      });
    } else if (form.email === "") {
      setFormError((prev) => {
        return { ...prev, email: true };
      });
    } else {
      dispatch(addTodo(form));
      setForm({
        title: "",
        email: "",
        body: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/5">
      <h2>Добавить задачу</h2>
      <Input
        className={styles.form__input}
        type="text"
        name="title"
        placeholder="Название задачи"
        minLength={3}
        maxLength={25}
        value={form.title}
        onChange={handleInputChange}
        variant="underlined"
        isInvalid={formError.title}
        errorMessage="Длина должна быть не менее 3 и не более 25 символов"
      />
      <Input
        className={styles.form__input}
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        isInvalid={formError.email}
        variant="underlined"
        errorMessage="Введите email"
      />
      <Input
        className={styles.form__input}
        type="text"
        placeholder="Текст задачи"
        name="body"
        value={form.body}
        onChange={handleInputChange}
        variant="underlined"
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  );
};

export default AddTodoForm;
