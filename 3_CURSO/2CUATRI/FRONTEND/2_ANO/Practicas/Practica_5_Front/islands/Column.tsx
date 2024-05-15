import { useState } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import { IS_BROWSER } from "$fresh/runtime.ts";
//props iniciales tareas filtradas por estado  (todo, inprogress...)
//funcion para crear tareas callback  que se ejecuta cada vez que pulso para mostrar un detalle
type task = {
  id: number;
  name: string;
  state: string;
  };
  

const Column = (props: {name:string,tasks:task[], onclick:(task: task)=>void}) => {
  return (
    <div className="Column">
      <h1 className="ColumnTitle">{props.name}</h1>
      {IS_BROWSER &&  props.tasks.map((task:task) => (
        <div className="task" onClick={()=>props.onclick(task)}>
          <div>{task.name}</div>
          <div>{task.state}</div>
        </div>
      ))}
    </div>
  );
};
export default Column;
