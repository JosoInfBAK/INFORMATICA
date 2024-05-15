import Counter from "../islands/Counter.tsx";
import axios from "npm:axios";
import Character from "../components/Character.tsx";
type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
};

type CharacterResponse = {
  results: Character[];
};

export default async function Home() {
  try{
    const response = await axios.get<CharacterResponse>(
      "https://rickandmortyapi.com/api/character"
    );
  const characters = response.data.results;
  return (
  <div>
     <h1>Rick and Morty Characters</h1>
      {characters.map((character) => (
        <Character
          key={character.id}
          name={character.name}
          image={character.image}
          status={character.status}
        />
      ))}
    </div>
   
  );
}
catch (error) {
  return <div>There was an error: {error.message}</div>;
}
}
