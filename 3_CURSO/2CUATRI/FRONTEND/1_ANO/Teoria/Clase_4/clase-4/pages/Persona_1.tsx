import Menu from "@/src/components/Menu";
import Persona from "@/src/components/Persona";
import Link from "next/link";

const persona_1 = () => {
  return (
    <div>
      <Menu />
      <Persona nombre="Paco" apellido="Perez" edad={20} genero="Masculino" css="persona_1" image="/saracatunga3.jpg" />
    </div>
  );
};

export default persona_1;
