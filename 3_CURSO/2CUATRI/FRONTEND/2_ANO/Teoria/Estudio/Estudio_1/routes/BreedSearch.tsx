import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import {
  Breed,
  RandomImageResponse,
  RecievedImage,
  ResponseBreeds,
} from "../types.ts";
import BreedImages from "../components/BreedImages.tsx";
import InputSearchBreed from "../islands/InputSearchBreed.tsx";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const breedToSearch = url.searchParams.get("Breed");
    const APIUrl = `https://dog.ceo/api/breed/${breedToSearch}/images`;
    try {
      const response = await Axios.get(APIUrl) || undefined;
      const responseBreedsSliced = response.data.message.slice(
        0,
        5,
      ) as RandomImageResponse;

      return ctx.render(
        responseBreedsSliced,
      );
    } catch (error) {
      return ctx.render(
        []
      );
    }
  },
};

const Page = (props: PageProps<string[] | undefined>) => {
  const BreedImages = props.data as string[];
  const reducedimages = BreedImages.slice(0, 3);
  return (
    <div className="BreedImagesComp">
      <h1 className="BreedsTitle">Images</h1>
      <InputSearchBreed />
      <div className="BreedName">
       Test
      </div>
      <a className="BreedImages">
        {reducedimages.map((reducedimages) => (
          <img className="Image" src={reducedimages} />
        ))}
      </a>
    </div>
  );
  
};
export default Page;
