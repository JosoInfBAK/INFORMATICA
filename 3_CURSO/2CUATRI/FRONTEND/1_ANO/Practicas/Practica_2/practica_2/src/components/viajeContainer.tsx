import Image from "next/image";
import Link from "next/link";
type viajeProps = {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
};

export default function ViajeContainer(props: viajeProps) {
  return (
    <div>
      <Link
        key={props.id}
        id={props.id.toString()}
        className="linkCont"
        href={`/viaje_detallado/${props.id}`}
      >
        <div className="viajeContainer" id={props.id.toString()}>
          <Image
            key={props.id}
            className="imagenPeque"
            id={props.id.toString()}
            src={props.imagen}
            alt={props.nombre}
            width={200}
            height={200}
          />
          <div>
            {" "}
            <h1 className="titulo" id="titulo">
              {props.nombre}
            </h1>
            <p className="descripcionPeque" id="descripcionPeque">
              {props.descripcion}
            </p>
            <Link key={props.id} href={`/#}`} id="link">
              <button className="bookbutton" id="bookButton">
                Reserva Ya!
              </button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
}
