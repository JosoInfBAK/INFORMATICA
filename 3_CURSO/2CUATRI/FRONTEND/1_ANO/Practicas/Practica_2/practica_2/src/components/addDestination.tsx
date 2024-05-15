/*
"name": "Madrid",
            "id": 1,
            "descripcion": "Capital de España",
            "imagen": "/Mad-Chiki.jpeg",
            "descripcionLarga": "Madrid es la capital de España y una ciudad vibrante y cosmopolita con una rica historia y cultura. Con una población de más de 3 millones de habitantes, la ciudad es un centro de negocios, turismo y vida nocturna. Madrid es famosa por su gastronomía, con una gran variedad de platos tradicionales y modernos para todos los gustos. La ciudad cuenta con numerosos museos y galerías de arte, incluyendo el Museo del Prado y el Museo Reina Sofía. Además, Madrid es el hogar del Real Madrid, uno de los equipos de fútbol más exitosos del mundo. Con una mezcla de arquitectura histórica y moderna, una amplia variedad de tiendas y una animada vida callejera, Madrid es un destino turístico popular para viajeros de todo el mundo.",
            "imagenGrande": "/Mad-Grande.jpg",
            "imagen2":"/Mad-Chiki2.jpeg"

*/
import destinos from "@/destinos.json";
import fs from "fs";

export default function AddDestination() {
  return (
    <div>
      
        <h1 className="titulo">Añadir destino</h1>
        <label>Nombre del destino</label>
        <input className="inputName" type="text" name="nombre" id="nombre" />
        <label>Imagen del destino</label>
        <input type="text" className="inputImg" name="imagen" id="imagen" />
        <label>Descripcion del destino</label>
        <input
          type="text"
          className="inputDesc"
          name="descripcion"
          id="descripcion"
        />
        <br></br>
        <button className="btnAdd" onClick={() => void(0)}>
          Añadir destino
        </button>
      </div>
  );
}
