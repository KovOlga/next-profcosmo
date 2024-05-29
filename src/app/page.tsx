"use client";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { addTodo } from "@/lib/features/todos/todosSlice";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IToDoItem } from "@/types/data";
import TableRow from "@/components/table-row";

const columnsToSearch = [
  { key: "title", label: "Название" },
  { key: "email", label: "email" },
  { key: "status", label: "Статус" },
];

const tableHeaders = ["id", "Название", "Текст", "Статус", "email", ""];

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const todosArr = useAppSelector((state: RootState) => state.todos.todos);
  const rowsPerPage = 3;
  const pages = Math.ceil(todosArr.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({
    title: "",
    email: "",
    body: "",
  });
  const [sortAscDesc, setSortAscDesc] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setsearchValue] = useState("");

  const [todos, setToDos] = useState(todosArr);
  const [visibleTodos, setVisibleTodos] = useState(todosArr.slice(0, 3));

  useEffect(() => {
    router.push("/");
  }, []);

  useEffect(() => {
    const updateVisible = [...todos].splice((currentPage - 1) * 3, 3);
    setVisibleTodos(updateVisible);
  }, [currentPage, todosArr, todos]);

  useEffect(() => {
    setToDos(todosArr);
  }, [todosArr]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(addTodo(form));
  };

  const sortTable = () => {
    setSortAscDesc(!sortAscDesc);
    const sortedToDos = [...todos].sort((a, b) => {
      const first = a.id;
      const second = b.id;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return !sortAscDesc ? -cmp : cmp;
    });
    setToDos(sortedToDos);
  };

  const filterTable = (selectValue: string) => {
    let filteredArr = [...todosArr];
    if (searchValue && selectValue) {
      filteredArr = filteredArr.filter((todo) =>
        todo[selectValue as keyof IToDoItem]
          .toString()
          .includes(searchValue.toLowerCase())
      );
    }
    setToDos(filteredArr);
  };

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    filterTable(e.target.value);
  };

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setsearchValue(value);
      setCurrentPage(1);
    } else {
      setsearchValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSelectValue("");
    setToDos(todosArr);
    setsearchValue("");
    setCurrentPage(1);
  }, []);

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
      <div className={styles.search}>
        <Input
          label="Search Input"
          isClearable
          placeholder="Введите и выберете столбец поиска"
          value={searchValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Select
          color="success"
          items={columnsToSearch}
          label="Search Column"
          placeholder="По каком столбцу искать"
          selectedKeys={[selectValue]}
          onChange={handleSelectionChange}
          defaultSelectedKeys={["title"]}
        >
          {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
        </Select>
      </div>
      <Button color="success" size="md" onPress={() => sortTable()}>
        Сортировать по id
      </Button>
      {todosArr && (
        <div className={styles.content}>
          <div className={styles.table}>
            {tableHeaders.map((header) => {
              return <p key={header}>{header}</p>;
            })}
            <div className={styles.table__body}>
              {visibleTodos.map((todo) => {
                return <TableRow key={todo.uniqueId} item={todo} />;
              })}
            </div>
          </div>
        </div>
      )}
      <div className={styles.pagination}>
        <Pagination
          total={pages}
          color="secondary"
          page={currentPage}
          onChange={setCurrentPage}
        />
        <div className={styles.pagination__controls}>
          <Button
            color="secondary"
            onPress={() => {
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
            }}
          >
            Previous
          </Button>
          <Button
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
      </div>
    </main>
  );
}
