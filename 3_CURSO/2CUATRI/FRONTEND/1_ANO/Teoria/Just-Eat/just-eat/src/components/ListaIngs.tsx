import Alimento from "./Alimento";

export function ListaIngs() {
  return (
    <div className="ListaIngs">
      <h1>Lista de ingredientes</h1>
      <ul>
        <li><Alimento nombre="Tomate" descripcion="Pues eso" precio="3"></Alimento></li>
      </ul>
    </div>
  );
}
