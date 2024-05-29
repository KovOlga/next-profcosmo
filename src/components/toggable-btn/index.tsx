import { Button } from "@nextui-org/react";
import { FC } from "react";

interface ToggableBtnProps {
  handleUpdateToDo: () => void;
  id: number;
  isEditState: boolean;
  setIsEditState: any;
}

const ToggableBtn: FC<ToggableBtnProps> = ({
  handleUpdateToDo,
  isEditState,
  setIsEditState,
  id,
}) => {
  return (
    <>
      {isEditState ? (
        <Button
          id={id.toString()}
          color="primary"
          onPress={() => setIsEditState(false)}
        >
          Редактировать
        </Button>
      ) : (
        <Button
          id={id.toString()}
          color="success"
          onPress={() => handleUpdateToDo()}
        >
          сохранить
        </Button>
      )}
    </>
  );
};

export default ToggableBtn;
