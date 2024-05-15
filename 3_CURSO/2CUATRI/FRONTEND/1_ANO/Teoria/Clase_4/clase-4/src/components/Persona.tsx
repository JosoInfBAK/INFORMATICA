import Image from "next/image";
import css from "styled-jsx/css";
type PersonaProps = {
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
  image: string;
  css?: string;
};

const Persona = (props: PersonaProps) => {
  return (
    <div className={props.css}>
      <Image src={props.image} width={200} height={200} alt={""} />
      <br />
      Nombre: {props.nombre} <br />
      Apellido:{props.apellido}
      <br />
      Edad:{props.edad}
      <br />
      Genero: {props.genero}
      <br />
      Clase : {props.css}
    </div>
  );
};

export default Persona;
