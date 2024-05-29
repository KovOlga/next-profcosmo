import { Button } from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { FC, useState } from "react";

interface ToggableBtnProps {
  handleEditToDo: (id: number) => void;
  handleUpdateToDo: () => void;
  id: number;
}

const ToggableBtn: FC<ToggableBtnProps> = ({
  handleEditToDo,
  handleUpdateToDo,
  id,
}) => {
  const [edit, setEdit] = useState(true);
  const handleEdit = (e: PressEvent) => {
    console.log("e", e);
    setEdit(false);
    handleEditToDo(id);
  };
  const handleSave = () => {
    setEdit(true);
    handleUpdateToDo();
  };
  return (
    <>
      {edit ? (
        <Button
          id={id.toString()}
          color="primary"
          onPress={(e) => handleEdit(e)}
        >
          Редактировать
        </Button>
      ) : (
        <Button id={id.toString()} color="success" onPress={() => handleSave()}>
          сохранить
        </Button>
      )}
    </>
  );
};

export default ToggableBtn;
