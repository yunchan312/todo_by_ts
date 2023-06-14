import { selector, useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, Categoriers } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categoriers.TO_DO}>ToDo</option>
        <option value={Categoriers.DOING}>Doing</option>
        <option value={Categoriers.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((aToDo) => (
        <ToDo key={aToDo.id} {...aToDo} />
      ))}
    </div>
  );
}

export default ToDoList;
