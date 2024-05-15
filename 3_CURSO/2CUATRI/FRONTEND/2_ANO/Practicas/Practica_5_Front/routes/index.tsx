import { useSignal } from "@preact/signals";
import MainPage from "../islands/MainPage.tsx";
//crear dos islas
//1 isla que es todo pantalla de inicio
//otra isla que sea cada una de las columnas

export default function Home() {
  const count = useSignal(3);
  return (
    <div className="home">
      <MainPage />
    </div>
  );
}
