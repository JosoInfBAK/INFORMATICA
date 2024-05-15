import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useState } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { Pages } from "../types.ts";
import { useEffect } from "preact/hooks";
import {DogResponse} from "../types.ts";
import axios from "npm:axios";


type Props = {
  Dogs: Signal<Pages>;
};
const Dogs: FunctionComponent<Props> = ({ Dogs }) => {
  const [dog, setDog] = useState<DogResponse | null>(null);
  const url = "https://api.api-ninjas.com/v1/dogs?name=";
  const headers = {
    "X-Api-Key": "UJhYVUxrSKqPZP7V8WD9PA==sYM7jOOqw36WSoOW",
  };
  useEffect(() => {
    axios.get(url, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Dogs.value]);
  return (
    <div>
      <h1>Dogs</h1>
      <div>
        <img src={dog?.image_link} alt="dog" />
        <p>Good with children: {dog?.good_with_children}</p>
        <p>Good with other dogs: {dog?.good_with_other_dogs}</p>
        <p>Shedding: {dog?.shedding}</p>
        <p>Grooming: {dog?.grooming}</p>
        <p>Drooling: {dog?.drooling}</p>
        <p>Coat length: {dog?.coat_length}</p>
        <p>Good with strangers: {dog?.good_with_strangers}</p>
        <p>Playfulness: {dog?.playfulness}</p>
        <p>Protectiveness: {dog?.protectiveness}</p>
        <p>Trainability: {dog?.trainability}</p>
        <p>Energy: {dog?.energy}</p>
        <p>Barking: {dog?.barking}</p>
        <p>Min life expectancy: {dog?.min_life_expectancy}</p>
        <p>Max life expectancy: {dog?.max_life_expectancy}</p>
        <p>Max height</p>
    </div>
    </div>
    );
}
export default Dogs;