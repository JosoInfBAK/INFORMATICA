import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import Column from "./Column.tsx";
import AniadirTarea from "./AniadirTarea.tsx";
import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
import ActualizarTarea from "./ActualizarTarea.tsx";

type task = {
  id: number;
  name: string;
  state: string;
};

const MainPage: FunctionComponent = () => {
  const [
    tasks,
    setTasks,
  ] = useState<task[]>([]);

  const [
    show,
    setShow,
  ] = useState(false);
  const [
    showactualizar,
    setShowactualizar,
  ] = useState(false);

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<task | null>(null);

  return (
    <div className="home">
      {selectedTask !== null && (
        <>
          <div className="taskDetail">
            <div className="ContainerTaskDetailTtitle">
              <h1 className="TaskDetailTitle">{selectedTask.name}</h1>
            </div>

            <p className="TaskDetailState">{selectedTask.state}</p>
            <button
              className="TaskDetailButtonClose"
              onClick={() => setSelectedTask(null)}
            >
              Cerrar
            </button>
            <button
              className="TaskDetailButtonActualizarDone"
              onClick={() =>
                setTasks(tasks.map((task) => {
                  if (task.id === selectedTask.id) {
                    return { ...task, state: "done" };
                  }
                  return task;
                }))}
            >
              Done
            </button>
            <button
              className="TaskDetailButtonActualizarInReview"
              onClick={() =>
                setTasks(tasks.map((task) => {
                  if (task.id === selectedTask.id) {
                    return { ...task, state: "inreview" };
                  }
                  return task;
                }))}
            >
              In Review
            </button>

            <button
              className="TaskDetailButtonActualizarInProgress"
              onClick={() =>
                setTasks(tasks.map((task) => {
                  if (task.id === selectedTask.id) {
                    return { ...task, state: "inprogress" };
                  }
                  return task;
                }))}
            >
              In Progress
            </button>{" "}
            <button
              className="TaskDetailButtonActualizarToDo"
              onClick={() =>
                setTasks(tasks.map((task) => {
                  if (task.id === selectedTask.id) {
                    return { ...task, state: "todo" };
                  }
                  return task;
                }))}
            >
              To Do
            </button>
            <button
              className="ActualizarColumnaButton"
              onClick={() => {
                setShowactualizar(true);
              }}
            >
              Actualizar Tarea
            </button>
          </div>
          <div className="overlaydetail" onClick={() => setSelectedTask(null)}>
          </div>
        </>
      )}
      <div className="ColumnsContainer">
        <button
          className="CrearColumnaButton"
          onClick={() => {
            setShow(true);
          }}
        >
          Crear Tarea
        </button>
        <Column
          name="Todo"
          tasks={tasks.filter((task) => task.state === "todo")}
          onclick={(task) => {
            setSelectedTask(task);
          }}
        />
        <Column
          name="In progress"
          tasks={tasks.filter((task) => task.state === "inprogress")}
          onclick={(task) => {
            setSelectedTask(task);
          }}
        />
        <Column
          name="In review"
          tasks={tasks.filter((task) => task.state === "inreview")}
          onclick={(task) => {
            setSelectedTask(task);
          }}
        />
        <Column
          name="Done"
          tasks={tasks.filter((task) => task.state === "done")}
          onclick={(task) => {
            setSelectedTask(task);
          }}
        />
      </div>
      {show && (
        <AniadirTarea
          onClose={() => {
            setShow(false);
          }}
          createTask={(task) => {
            setTasks([...tasks, task]);
          }}
        />
      )}
      {showactualizar && (
        <ActualizarTarea
          onClose={() => {
            setShowactualizar(false);
          }}
          acttask={(act) => {
            setTasks(tasks.map((task) => {
              if (task.id === act.id) {
                return { ...task, name: task.name, state: task.state };
              }
              return task;
            }));
          }}
        />
      )}
    </div>
  );
};
export default MainPage;
