import { atom } from "recoil";

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}
