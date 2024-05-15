import { useSignal } from "@preact/signals";
import { DogResponse, Pages } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import Axios from "npm:axios";
import { IS_BROWSER } from "$fresh/runtime.ts";
import NavPanel from "../components/NavPanel.tsx";

const MainPage = () => {
  const MainPage = useSignal<Pages>(Pages.MainPage);
  const NotFound = useSignal<Pages>(Pages.NotFound);
  const Dogs = useSignal<Pages>(Pages.Dogs);
  const Cats = useSignal<Pages>(Pages.Cats);
  const Animals = useSignal<Pages>(Pages.Animals);
  const dog = useSignal<DogResponse | null>(null);
  const urlDogs = "https://api.api-ninjas.com/v1/dogs?name=";
  const urlCats = "https://api.api-ninjas.com/v1/cats?name=";
  const urlAnimals = "https://api.api-ninjas.com/v1/animals?name=";
  const APIKEY = "UJhYVUxrSKqPZP7V8WD9PA==sYM7jOOqw36WSoOW";
  const headers = {
    "X-Api-Key": APIKEY,
  };

  useEffect(() => {
    Axios.get(urlDogs, { headers })
      .then((response) => {
       Dogs.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dog.value]);

  useEffect(() => {
    Axios.get(urlCats, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Cats.value]);

  useEffect(() => {
    Axios.get(urlAnimals, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Animals.value]);

  return (
    <div>
      <h1>Main Page</h1>
      <NavPanel page={MainPage} Dogs={Dogs} Cats={Cats} Animals={Animals} />
    </div>
  );
};
export default MainPage;
