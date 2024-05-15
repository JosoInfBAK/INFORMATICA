import Link from "next/link"

  type AlimentoProps = {
    nombre: string,
    descripcion: string,
    precio: string
}

export default function Alimento(props: AlimentoProps) {
  return (
    <div className="Alimento">
      <Link href="#">{props.nombre}</Link>
    </div>
  );
}