import { useState } from "preact/hooks";
import { Axios } from "npm:axios";
import { Breed, RandomImageResponse, ResponseBreeds } from "../types.ts";

const InputSearchBreed = () => {
  const [search, setSearch] = useState<Breed[]>([]);
  const onSearch = async (searchText:string)  : Promise<void> => {
    const APIUrl = `https://dog.ceo/api/breed/${search}/images`;
    try {
      const response = await fetch(APIUrl) as unknown as ResponseBreeds;
      const responseBreedsSliced = response.message.slice(0, 5) as Breed[];
      setSearch((responseBreedsSliced));
      console.log(responseBreedsSliced);
    } catch (error) {
      return setSearch([]);
    }
  };
  return (
    <form className="FormSearchBreed2" >
      <input
        type="text"
        placeholder="Search Breed"
        onChange={(e) => setSearch(e.target!.value! as Breed[])}
        className="InputSearchBreed"
      />
      <button
        type="submit"
        className="ButtonSearchBreed"
        onClick={() => onSearch(search)}
      >
        Search
      </button>
    </form>
  );
};

export default InputSearchBreed;
