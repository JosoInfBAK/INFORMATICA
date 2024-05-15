import destinos from "@/destinos.json";
import TextField from "@mui/material/TextField";
import dynamic from "next/dynamic";
import { useState } from "react";
import MenuLateral from "@/components/lateralMenu";
import ViajeContainer from "@/components/viajeContainer";
import AddDestination from "../components/addDestination";

declare global {
  interface Window {
    test: any;
  }
}

const DynamicViajeContainer = dynamic(
  () => import("@/components/viajeContainer"),
  {
    ssr: false,
  }
);

const DynamicMenuLateral = dynamic(() => import("@/components/lateralMenu"), {
  ssr: false,
});

export default function Index() {
  const [inputText, setInputText] = useState("");
  const [destinoState, setDestinoState] = useState(destinos.results);

  function despiegaFormulario() {
    window.test = () => {
      const name = document.getElementById("nombre") as HTMLInputElement;
      name.value = name.value.charAt(0).toUpperCase() + name.value.slice(1);
      const imagen = "/Mad-Chiki.jpeg";
      const descripcion = document.getElementById(
        "descripcion"
      ) as HTMLInputElement;
      const newDestino = {
        name: name.value,
        imagen: imagen,
        descripcion: descripcion.value,
        id: destinoState.length + 1,
        descripcionLarga: "Descripcion larga",
        imagenGrande: "/Mad-Grande.jpg",
        imagen2: "/Mad-Chiki2.jpeg",
      };
      window.localStorage.setItem("state", JSON.stringify([...destinoState, newDestino]));
      setDestinoState([...destinoState, newDestino]);
      document.body.removeChild($FormContainer);
    };
    const $FormContainer = document.createElement("div");
    $FormContainer.className = "formContainer";
    $FormContainer.innerHTML = `<div>
      <h1 class="titulo">Añadir destino</h1>
      <label class="label" >Nombre del destino</label>
      <input class="inputName" type="text" name="nombre" id="nombre" />
      <label class="label" >Imagen del destino</label>
      <input type="text" class="inputImg" name="imagen" id="imagen" />
      <label class="label" >Descripcion del destino </label>
      <input
        type="text"
        class="inputDesc"
        name="descripcion"
        id="descripcion"
      />
      <br></br>
      <button class="btnAdd" onclick='test()'>
        Añadir destino
      </button>
  </div>`;
    document.body.appendChild($FormContainer);
  }

  let inputHandler = (e: { target: { value: string } }) => {
    var lowerCase = e.target.value;
    setInputText(lowerCase);
  };
  let state = destinos.results;
  if (typeof window !== "undefined") {
    state = JSON.parse(window.localStorage.getItem("state") || "[]");
  } else state = destinos.results;

  function eliminaDestino() {
    const name = window.prompt("Introduce el nombre del destino a eliminar");
    const newDestino = destinoState.filter((d) => d.name !== name);
    setDestinoState(newDestino);
  }

  return (
    <div>
      <div className="header">Super Viajes Socio</div>
      <DynamicMenuLateral Destinos={state}></DynamicMenuLateral>
      <div className="search">
        <button
          className="addDestino"
          onClick={(e) => {
            despiegaFormulario();
          }}
        >
          Añadir destino
        </button>
        <button
          className="addDestino"
          onClick={(e) => {
            eliminaDestino();
          }}
        >
          Eliminar Destino
        </button>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={inputHandler}
          fullWidth
          label="Search"
        />
      </div>
      {state
        .filter((result) => {
          return result.name
            .normalize("NFD")
            .toLocaleLowerCase()
            .replace(/\p{Diacritic}/gu, "")
            .includes(inputText.toLocaleLowerCase());
        })
        .map((d) => (
          <DynamicViajeContainer
            id={d.id}
            nombre={d.name}
            imagen={d.imagen}
            descripcion={d.descripcion}
            key={d.id}
          ></DynamicViajeContainer>
        ))}
    </div>
  );
}
