import { Checkbox } from "@nextui-org/react";
import { FC, useState } from "react";
import { IToDoItem, ToDoStatus } from "@/types/data";
import ToggableBtn from "../toggable-btn";
import { PressEvent } from "@react-types/shared";
import styles from "./styles.module.scss";
import { useAppDispatch } from "@/lib/hooks";
import { updateTodo } from "@/lib/features/todos/todosSlice";

interface row {
  item: IToDoItem;
}
const TableRow: FC<row> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [isEditState, setIsEditState] = useState(true);
  const [textarea, setTextarea] = useState(item.body);
  const [isSelected, setIsSelected] = useState(
    item.status === ToDoStatus.DONE ? true : false
  );

  const handleSave = () => {
    setIsEditState(true);
    dispatch(
      updateTodo({
        ...item,
        body: textarea,
        status: isSelected ? ToDoStatus.DONE : ToDoStatus.NOTDONE,
      })
    );
  };

  return (
    <li className={styles.item}>
      <p>{item.id}</p>
      <p>{item.title}</p>
      {isEditState ? (
        <p>{textarea}</p>
      ) : (
        <textarea
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
      <ToggableBtn
        isEditState={isEditState}
        setIsEditState={setIsEditState}
        handleUpdateToDo={handleSave}
        id={item.id}
      />
    </li>
  );
};

export default TableRow;
