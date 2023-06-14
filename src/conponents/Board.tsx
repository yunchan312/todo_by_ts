import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo } from "../atoms";
import { toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  min-height: 250px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ffde91"
      : props.isDraggingFromThis
      ? "#feca57"
      : "transparent"};
  flex-grow: 1;

  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    border: 4px dashed #feca57;
    border-radius: 15px;
    width: 95%;
    height: 35px;
    background-color: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  }
`;

const Title = styled.h1`
  width: 100px;
  background-color: white;
  text-align: center;
  margin: 10px;
  place-self: center;
  font-size: 18px;
  font-weight: 900;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                index={index}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
