import Menu from "@/src/components/Menu";
import Persona from "@/src/components/Persona";
import Link from "next/link";

const persona_2 = () => {
  return (
    <div>
      <Menu />
      <div> 
      <Persona nombre="Jacinto" apellido="Potente" edad={20} genero="Masculino" css="persona_2" image="/saracatunga.jpg" />
      </div>
    </div>
  );
};

export default persona_2;
