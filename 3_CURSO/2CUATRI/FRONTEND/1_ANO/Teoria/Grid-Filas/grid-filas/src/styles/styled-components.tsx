import EdiText from "react-editext";
import styled from "styled-components";

export type StyledInputProps = {
    bckColor?: string;
    shadow?: string;
    valid?: boolean;
  };
  
  export const Conatiner = styled.div`
    display: grid;
    position: relative;
    padding-left: 25%;
    row-gap: 1px;
    grid-template-columns: repeat(3, 0.3fr);
    width: 100%;
    height: 100%;
  `;
  
  export  const DataContainer = styled.div`
    display: grid;
    align-items: center;
    position: relative;
    justify-content: center;
    align-self: center;
    align-content: center;
    padding-left: 20%;
    gap: 1px;
    grid-template-columns: repeat(3, 0.3fr);
    
    width: 100%;
    height: 100%;
  `;
  
  export const AddButton = styled.button`
    border: 1px solid black;
    border-radius: 5px;
    width: 10%;
    height: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    top: 1%;
    right: 25%;
    padding: 5px;
    margin: 5px;
    background-color: black;
    color: white;
  `;
  
 export const StyledInputName = styled.input<StyledInputProps>`
    border: 1px solid black;
    width: 50%;
    border-radius: 5px;
    padding: 15px;
    margin: 5px;
    background-color: ${(props) => (props.valid ? "green" : "red" || "white")};
    box-shadow: ${(props) => props.shadow || "none"};
  `;
  export const StyledInputDni = styled.input<StyledInputProps>`
    border: 1px solid black;
    width: 50%;
    border-radius: 5px;
    padding: 15px;
    margin: 5px;
    background-color: ${(props) => (props.valid ? "green" : "red" || "white")};
    box-shadow: ${(props) => props.shadow || "none"};
  `;
  
  export const StyledInput = styled.input<StyledInputProps>`
    border: 1px solid black;
    width: 50%;
    height: 20%;
    border-radius: 5px;
    padding: 15px;
    margin: 5px;
    background-color: ${(props) => props.bckColor || "white"};
    box-shadow: ${(props) => props.shadow || "none"};
  `;
  
  export const StyledEdiText = styled(EdiText)`
    border: 1px solid black;
    display: flex;
    width: 54%;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    button {
      width: 100%;
      height: 100%;
    }
  `;
  