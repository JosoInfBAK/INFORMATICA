import { useRouter } from "next/router";
import destinos from "@/destinos.json";
import Link from "next/link";
import Image from "next/image";

export default function ViajeDetallado() {
  const router = useRouter();
  const { id } = router.query;
  let formatId = parseInt(id as string);
  let nextId;
  let prevId;
  if (formatId < destinos.results.length) nextId = formatId + 1;else nextId = 1;
  if (formatId > 1) prevId = formatId - 1;else prevId = destinos.results.length;

  return (
    <div className="result">
      <Image
        className="imagenGrande"
        src={destinos.results.find((d) => d.id === formatId)?.imagenGrande || ""}
        alt={destinos.results.find((d) => d.id === formatId)?.name || ""}
        width={500}
        height={500}
      />
      <div className="imagesContainer">
      <Image className="imagenPequeInside" src={destinos.results.find((d) => d.id === formatId)?.imagen || ''} alt={destinos.results.find((d) => d.id === formatId)?.name || ''} width={200} height={200} />
      <Image className="imagenPequeInside2" src={destinos.results.find((d) => d.id === formatId)?.imagen2 || ''} alt={destinos.results.find((d) => d.id === formatId)?.name || ''}  width={200} height={200} /></div>
      <h1 className="tituloInside">
        {destinos.results.find((d) => d.id === formatId)?.name}{" "}
      </h1>
      <div className="descripcionLarga">
        {destinos.results.find((d) => d.id === formatId)?.descripcionLarga}{" "}
      </div>
      <Link href={"#"} className="linkButtonReservar">
        {" "}
        <button className="bookbuttonInside">Reservar Viaje</button>
      </Link>
      <Link href={"/"} className="linkButtonHome">
        {" "}
        <button className="Home">Home</button>
      </Link>
      <Link
        href={`/viaje_detallado/${nextId}`}
        className="linkButtonNext"
      >
        {" "}
        <button className="Home">Next &#8250; </button>
      </Link>
      <Link
        href={`/viaje_detallado/${prevId}`}
        className="linkButtonPrev"
      >
        {" "}
        <button className="Home"> &#8249; Previous </button>
      </Link>
    </div>
  );
}
