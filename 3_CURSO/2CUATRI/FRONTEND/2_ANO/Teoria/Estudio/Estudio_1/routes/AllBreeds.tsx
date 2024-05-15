import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { ResponseBreeds, Breed } from "../types.ts";


export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const APIUrl = "https://dog.ceo/api/breeds/list/all";
    const response = await Axios.get(APIUrl);
    const responseBreeds = response.data as ResponseBreeds;
    return ctx.render(
      responseBreeds,
    );
  },
};
const Page = (props: PageProps<ResponseBreeds | undefined>) => {
  const AllBreeds: Breed[] = props.data!.message;
  if (!AllBreeds) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className="BreedsTitle">All Breeds</h1>
        <ul className="BreedList">
          {Object.keys(AllBreeds).map((breed) => (
            <a className="BreedsListLinks" href={`/Breed/${breed}`}>
              {breed}
            </a>
          ))}
        </ul>
      </div>
    );
  }
};

export default Page;
