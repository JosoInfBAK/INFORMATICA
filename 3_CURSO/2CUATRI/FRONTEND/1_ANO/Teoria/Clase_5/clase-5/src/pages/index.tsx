import { useState } from "react";
import { Component } from "react";
import styled from "styled-components";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [mayor, setMayor] = useState<boolean>(false);
  const [coche, setCoche] = useState<boolean>(false);
  const [audi, setAudi] = useState<boolean>(false);
  function checkEdad() {
    if (counter >= 18) {
      setMayor(true);
    } else {
      setMayor(false);
    }
  }

  const handleOnChange = () => {
    setCoche(!coche);
  };

  const checkMarca = (e: any) => {
    if (
      e.target.value
        .normalize("NFD")
        .toLocaleLowerCase()
        .replace(/\p{Diacritic}/gu, "") ===
      "Audi"
        .normalize("NFD")
        .toLocaleLowerCase()
        .replace(/\p{Diacritic}/gu, "")
    )
      setAudi(true);
    else setAudi(false);
  };

  return (
    <div>
      <h1>Introduce tu edad:</h1>
      <input
        type="number"
        onChange={(e) => setCounter(parseInt(e.target.value))}
      />
      <button type="button" onClick={() => checkEdad()}>
        Check edad
      </button>
      {mayor ? (
        <div>
          {" "}
          <h1>Eres mayor de edad</h1>
          <input
            type="checkbox"
            checked={coche}
            onChange={handleOnChange}
          ></input>
          {coche ? (
            <div>
              <h1>Marca de tu coche</h1>
              <InputStyled
                onChange={(e: any) => checkMarca(e)}
                primary={audi}
              ></InputStyled>{" "}
            </div>
          ) : (
            <h1>No tienes coche</h1>
          )}
        </div>
      ) : (
        <h1>Eres menor de edad</h1>
      )}
    </div>
  );
}

const InputStyled = styled.input`
  background-color: ${(props: { primary: boolean }) =>
    props.primary ? "green" : "white" || "white"};
  color: ${(props: { primary: boolean }) =>
    props.primary ? "white" : "black" || "black"};
  box-shadow: ${(props: { primary: boolean }) =>
    props.primary ? "0 0 10px 0 green" : "0 0 10px 0 black" || "0 0 10px 0 black"};
    
`;
