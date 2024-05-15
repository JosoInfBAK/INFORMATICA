import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";
import BreedImages from "../../components/BreedImages.tsx";
import { ResponseAPI } from "../../types.ts";



export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const wholehurl = url.pathname;
    const breed = wholehurl.split("/")[2];
    console.log(breed);
    const APIUrlImages = `https://dog.ceo/api/breed/${breed}/images`;
    const response = await Axios.get(APIUrlImages) as ResponseAPI;
    return ctx.render(response);
  },
};
const Page = (props: PageProps<ResponseAPI | undefined>) => {
  const images: string[] = props.data!.data.message;
  if (!images) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <BreedImages images={images} />
      </div>
    );
  }
};
export default Page;
