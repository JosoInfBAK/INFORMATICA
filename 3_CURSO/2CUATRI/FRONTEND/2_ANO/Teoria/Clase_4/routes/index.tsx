import axios from "npm:axios";
type Character ={
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    url: string;
    created: string;
}
type CharacterResponse = {
  results: Character[];
};
export default async function Home() {
  const response = await axios.get<CharacterResponse>(
    "https://rickandmortyapi.com/api/character",
  );
  const characters = response.data.results;  

  return (
    <html>
      <body>
        <h1>Personajes de Rick and Morty</h1>
        <div className={"CharacterContainer"}>
          {characters.map((character: Character) => (
            <a href={`/character/${character.id}`}>
            <div>
              <div className="Character">
                <div>
                  <h1 className="NameCharacter">{character.name}</h1>
                </div>
                <div>
                  <img
                    className="ImageCharacter"
                    src={character.image}
                    alt={character.name}
                  />
                </div>
                <div>
                  <p>Status: {character.status}</p>
                </div>
                <div>
                  <p>Species: {character.species}</p>
                </div>
              </div>
            </div>
            </a>
          ))}
        </div>
      </body>
    </html>
  );
}
