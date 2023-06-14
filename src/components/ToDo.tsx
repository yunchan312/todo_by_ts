import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState, Categoriers } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categoriers.DOING && (
        <button name={Categoriers.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categoriers.TO_DO && (
        <button name={Categoriers.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categoriers.DONE && (
        <button name={Categoriers.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
