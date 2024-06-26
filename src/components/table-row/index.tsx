import { Checkbox } from "@nextui-org/react";
import { FC, useState } from "react";
import { IToDoItem, Roles, ToDoStatus } from "@/types/data";
import ToggableBtn from "../toggable-btn";
import { useAppDispatch } from "@/lib/hooks";
import { updateTodo } from "@/lib/features/todos/todosSlice";

interface TableRowProps {
  item: IToDoItem;
  role: string | null;
}
const TableRow: FC<TableRowProps> = ({ item, role }) => {
  const dispatch = useAppDispatch();
  const [isEditState, setIsEditState] = useState(true);
  const [textarea, setTextarea] = useState(item.body);
  const [isSelected, setIsSelected] = useState(
    item.status === ToDoStatus.DONE ? true : false,
  );

  const handleSave = () => {
    setIsEditState(true);
    dispatch(
      updateTodo({
        ...item,
        body: textarea,
        status: isSelected ? ToDoStatus.DONE : ToDoStatus.NOTDONE,
      }),
    );
  };

  return (
    <li
      className={`flex flex-col gap-2.5 md:grid md:grid-rows-1 ${role === Roles.ADMIN ? "grid-cols-6" : "grid-cols-5"}`}
    >
      <p>{item.id}</p>
      <p>{item.title}</p>
      {isEditState ? (
        <p>{textarea}</p>
      ) : (
        <textarea
          className="resize-none"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        ></textarea>
      )}
      <p>
        {isEditState ? (
          isSelected ? (
            ToDoStatus.DONE
          ) : (
            ToDoStatus.NOTDONE
          )
        ) : (
          <Checkbox
            color="success"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            Задача выполнена
          </Checkbox>
        )}
      </p>
      <p>{item.email}</p>
      {role && role === Roles.ADMIN && (
        <ToggableBtn
          isEditState={isEditState}
          setIsEditState={setIsEditState}
          handleUpdateToDo={handleSave}
          id={item.id}
        />
      )}
    </li>
  );
};

export default TableRow;
