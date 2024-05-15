import Menu from "@/src/components/Menu";
import Persona from "@/src/components/Persona";
import Link from "next/link";

const persona_3 = () => {
  return (
    <div>
      <Menu />
      <Persona nombre="Pedro" apellido="Pipo" edad={20} genero="Masculino" css="persona_3" image="/saracatungon.jpeg" />
    </div>
  );
};

export default persona_3;
