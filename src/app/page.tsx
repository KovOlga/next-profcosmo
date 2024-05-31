"use client";
import styles from "./page.module.css";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useCallback, useEffect, useState } from "react";
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
import AddTodoForm from "@/components/add-todo-form";

const columnsToSearch = [
  { key: "title", label: "Название" },
  { key: "email", label: "email" },
  { key: "status", label: "Статус" },
];

const tableHeaders = ["id", "Название", "Текст", "Статус", "email", ""];

export default function Home() {
  const router = useRouter();
  const todosArr = useAppSelector((state: RootState) => state.todos.todos);
  const role = useAppSelector((state: RootState) => state.todos.role);
  const rowsPerPage = 3;
  const [pages, setPages] = useState<number>(
    Math.ceil(todosArr.length / rowsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [sortAscDesc, setSortAscDesc] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setsearchValue] = useState("");

  const [todos, setToDos] = useState(todosArr);
  const [visibleTodos, setVisibleTodos] = useState(todosArr.slice(0, 3));

  useEffect(() => {
    router.push("/");
  }, []);

  useEffect(() => {
    setPages(Math.ceil(todos.length / rowsPerPage));
  }, [todos]);

  useEffect(() => {
    const updateVisible = [...todos].splice((currentPage - 1) * 3, 3);
    setVisibleTodos(updateVisible);
  }, [currentPage, todos]);

  useEffect(() => {
    setToDos(todosArr);
  }, [todosArr]);

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

  const filterTable = () => {
    let filteredArr = [...todosArr];
    if (searchValue && selectValue) {
      filteredArr = filteredArr.filter((todo) => {
        return selectValue === "status"
          ? todo[selectValue as keyof IToDoItem].toString() ===
              searchValue.toLowerCase()
          : todo[selectValue as keyof IToDoItem]
              .toString()
              .includes(searchValue.toLowerCase());
      });
    }
    setToDos(filteredArr);
  };

  const onInputSearchChange = useCallback((value: string) => {
    if (value) {
      setsearchValue(value);
      setCurrentPage(1);
    } else {
      setsearchValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setToDos(todosArr);
    setsearchValue("");
    setCurrentPage(1);
  }, []);

  return (
    <main className={styles.main}>
      <Link href="/logout">
        <button className={styles.button}>Выйти</button>
      </Link>
      <AddTodoForm />
      <div className={styles.search}>
        <Input
          label="Search Input"
          isClearable
          placeholder="Введите и выберете столбец поиска"
          value={searchValue}
          onClear={() => onClear()}
          onValueChange={onInputSearchChange}
        />
        <Select
          color="success"
          items={columnsToSearch}
          label="Search Column"
          placeholder="По каком столбцу искать"
          selectedKeys={[selectValue]}
          onChange={(e) => setSelectValue(e.target.value)}
          defaultSelectedKeys={["title"]}
        >
          {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
        </Select>
        <Button color="success" onPress={() => filterTable()}>
          Искать
        </Button>
      </div>
      <Button color="success" size="md" onPress={() => sortTable()}>
        Сортировать по id
      </Button>
      {todosArr && (
        <div className={styles.table}>
          <div className={styles.table__headers}>
            {tableHeaders.map((header) => {
              return (
                <p className={styles.table__header} key={header}>
                  {header}
                </p>
              );
            })}
          </div>
          <ul className={styles.table__body}>
            {visibleTodos.map((todo) => {
              return <TableRow key={todo.uniqueId} item={todo} role={role} />;
            })}
          </ul>
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
