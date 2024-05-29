import { Button } from "@nextui-org/react";
import { FC, useState } from "react";

const ToggableBtn: FC = () => {
  const [edit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(false);
  };
  const handleSave = () => {
    setEdit(true);
  };
  return (
    <>
      {edit ? (
        <Button color="primary" onPress={() => handleEdit}>
          Редактировать
        </Button>
      ) : (
        <Button color="success" onPress={() => handleSave}>
          сохранить
        </Button>
      )}
    </>
  );
};

export default ToggableBtn;
