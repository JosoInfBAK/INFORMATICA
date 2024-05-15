import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Breed, RandomImageResponse,RandomImageResponsePage, ResponseBreeds } from "../types.ts";
import BreedImages from "../components/BreedImages.tsx";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const APIUrl = "https://dog.ceo/api/breeds/image/random";
    const response = await Axios.get(APIUrl);
    const responseBreeds = response.data as RandomImageResponse;
    return ctx.render(
      responseBreeds,
    );
  },
};
const Page = (props: PageProps<RandomImageResponse | undefined>) => {
  const AllBreeds: string = props.data!.message;
  const BreedRecieved =AllBreeds.split("/")[4];
  console.log(BreedRecieved);
  if (!AllBreeds) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className="BreedsTitle">Random Image</h1>
        <h2 className="BreedName">Breed: {BreedRecieved}</h2>
        <BreedImages images={[AllBreeds]} />
      </div>
    );
  }
};
export default Page;
