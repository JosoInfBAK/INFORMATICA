import { tasktype } from "../types.ts";
import { useState } from "preact/hooks";
type Props = {
  onClose: () => void;
  acttask: (task: tasktype) => void;
};
const ActualizarTarea = (props: Props) => {
  const [task, setTask] = useState<tasktype>({ id: 0, name: "", state: "" });

  function acttaskisland() {
    props.acttask({
      id: Math.random(),
      name: task.name,
      state: task.state,
    });
  }

  return (
    <>
      <div className="overlay" onClick={props.onClose}></div>
      <form
        className="ActualizarTareaForm"
        onSubmit={(e) => {
          e.preventDefault();
          acttaskisland();
          props.onClose();
        }}
      >
        <input
          className="InputActualizarTarea"
          type="text"
          placeholder="Nombre de la tarea"
        />
        <input
          className="InputActualizarTarea"
          type="text"
          placeholder="Descripcion de la tarea"
          onChange={(e) => {
            setTask({ ...task, name: e.target.value });
          }}
        />
        <select
          className="InputActualizarTarea"
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
          className="ButtonActualizarTarea"
        >
          Actualizar
        </button>
      </form>
    </>
  );
};
export default ActualizarTarea;
