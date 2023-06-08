import { IToDo } from "../atoms";
import { useRecoilValue } from "recoil";

function ToDo({ text }: IToDo) {
  return <li>{text}</li>;
}

export default ToDo;
