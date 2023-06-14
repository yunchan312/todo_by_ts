import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 15px;
  margin: 8px;
  padding: 10px 10px;
  font-weight: 900;
  font-size: 15px;
  background-color: ${(props) =>
    props.isDragging ? "#1dd1a1" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 2px 5px rgba(0,0,0,0.5)"
      : "0px 2px 5px rgba(0,0,0,0.1)"};
  min-width: 200px;
  :hover {
    background-color: #1dd1a1;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
