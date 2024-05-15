import React from "react";
import styled from "styled-components";
import EdiText from "react-editext";
import { useState } from "react";
import { AddButton, Conatiner, DataContainer, StyledEdiText, StyledInput, StyledInputDni, StyledInputName } from "@/styles/styled-components";


export default function Home() {
  type userData = {
    name: string;
    dni: string;
  };
  const [name, setName] = React.useState("");
  const [dni, setDni] = React.useState("");
  const [globalData, setGlobalData] = React.useState([] as userData[]);
  const [validDni, setValidDni] = React.useState(false);
  const [validName, setValidName] = React.useState(false);

  function checkValidDni(e: React.ChangeEvent<HTMLInputElement>, dni: string) {
    setDni(dni);
    const dniRegex = new RegExp("^[0-9]{8}[A-Za-z]$");
    setValidDni(dniRegex.test(dni));
  }

  function checkValidName(
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) {
    setName(name);
    const nameRegex = new RegExp("^[a-zA-Z-ZÀ-ÿ].*[s.]*$");
    setValidName(nameRegex.test(name));
  }

  function submitData() {
    //check if the dni is already added
    if (!validDni || !validName) {
      alert("Datos invalidos");
      return;
    }
    if (globalData.find((data) => data.dni === dni) != null) {
      alert("DNI ya agregado");
      return;
    }
    setGlobalData([...globalData, { name, dni }]);
    console.log(globalData);
  }
  return (
    <div>
      <Conatiner>
        {" "}
        <StyledInputName
          className="input"
          placeholder="Nombre"
          type="text"
          bckColor="#f0f0f0"
          valid={validName}
          shadow="0px 0px 5px 0px rgba(0,0,0,0.75)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkValidName(e, e.target.value)}
        />
        <StyledInputDni
          className="input"
          placeholder="DNI"
          valid={validDni}
          type="text"
          bckColor="#f0f0f0"
          shadow="0px 0px 5px 0px rgba(0,0,0,0.75)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkValidDni(e, e.target.value)}
        />
        <AddButton onClick={submitData}>+</AddButton>
      </Conatiner>

      {globalData.map((data) => {
        return (
          <DataContainer>
            {" "}
            <StyledEdiText
              type="textarea"
              buttonsAlign="before"
              onSave={(v: any) => console.log("EDITING STARTED: ", v)}
              value={data.name}
            ></StyledEdiText>{" "}
            <StyledInput value={data.dni}></StyledInput>{" "}
          </DataContainer>
        );
      })}
    </div>
  );
}

