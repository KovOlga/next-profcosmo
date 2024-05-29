"use client";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { addTodo } from "@/lib/features/todos/todosSlice";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  useEffect(() => {
    router.push("/");
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(addTodo(form));
  };

  const items = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return todosArr.slice(start, end);
  }, [currentPage, todosArr]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a.id;
      const second = b.id;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const columnsToSearch = [
    { key: "title", label: "title" },
    { key: "email", label: "email" },
    { key: "status", label: "status" },
  ];
  const [value, setValue] = useState("");
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
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
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by ..."
          // value={filterValue}
          // onClear={() => onClear()}
          // onValueChange={onSearchChange}
        />
        <Select
          color="success"
          items={columnsToSearch}
          label="Search Column"
          placeholder="По каком столбцу искать"
          selectedKeys={[value]}
          onChange={handleSelectionChange}
        >
          {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
        </Select>
      </div>
      {todosArr && (
        <Table
          aria-label="table"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            table: "min-h-[400px]",
          }}
          bottomContent={
            <div className={styles.pagination}>
              <Pagination
                total={pages}
                color="secondary"
                page={currentPage}
                onChange={setCurrentPage}
              />
              <div className={styles.pagination__controls}>
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => {
                    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
                  }}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="flat"
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
          }
        >
          <TableHeader>
            <TableColumn key="id" allowsSorting>
              id
            </TableColumn>
            <TableColumn key="title">title</TableColumn>
            <TableColumn key="body">body</TableColumn>
            <TableColumn key="status">status</TableColumn>
            <TableColumn key="email">email</TableColumn>
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item) => (
              <TableRow key={item.title}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
