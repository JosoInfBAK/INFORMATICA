import { FunctionComponent } from 'preact';
type Character ={
    id: number;
    name: string;
    status: string;
    species: string;
    type: string
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
    
}
const Char: FunctionComponent<{ character: Character }> = ({ character }) => {
    return (
        <a href={`/character/${character.id}`}>
        <div class="Character">
            <div>Test</div>
            <div><h1 class="NameCharacter">{character.name}</h1></div>
            <div><img class="ImageCharacter" src={character.image} alt={character.name} /></div>
            <div><p>Status: character.status</p></div>
            <div><p>Species: character.species</p></div>
        </div>
        </a>
    );
}