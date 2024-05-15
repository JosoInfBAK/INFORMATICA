import { tasktype } from "../types.ts";
import { useState } from "preact/hooks";
type Props = {
  onClose: () => void;
  createTask: (task: tasktype) => void;
};

const AniadirTarea = (props: Props) => {
  const [task, setTask] = useState<tasktype>({ id: 0, name: "", state: "" });

  function createTaskisland() {
    props.createTask({
      id: Math.random(),
      name: task.name,
      state: task.state,
    });
  }

  return (
    <>
      <div className="overlay" onClick={props.onClose}></div>
      <div className="AniadirTarea">
        <form
          className="AniadirTareaForm"
          onSubmit={(e) => {
            e.preventDefault();
            createTaskisland();
            props.onClose();
          }}
        >
          <input
            className="InputAniadirTarea"
            type="text"
            placeholder="Nombre de la tarea"
          />
          <input
            className="InputAniadirTarea"
            type="text"
            placeholder="Descripcion de la tarea"
            onChange={(e) => {
              setTask({ ...task, name: e.target.value });
            }}
          />
          <select
            className="InputAniadirTarea"
            name="state"
            id="state"
            onChange={(e) => {
              setTask({ ...task, state: e.target.value });
            }}
          >
            <option value="">Estado</option>
            <option value="todo">todo</option>
            <option value="inprogress">In progress</option>
            <option value="inreview">In Review</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="ButtonAniadirTarea"
          >
            Crear Tarea
          </button>
        </form>
      </div>
    </>
  );
};
export default AniadirTarea;
