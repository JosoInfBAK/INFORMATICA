import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";
import BreedImages from "../../../components/BreedImages.tsx";
import { RecievedImage } from "../../../types.ts";

export const Handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const wholehurl = url.pathname;
    console.log(wholehurl);
    const APIUrlImages = `https://dog.ceo/api/breed/${url}/images`;
    const response = await Axios.get(APIUrlImages) as RecievedImage;
    console.log(response);
    return ctx.render(response);
  },
};

const Page = (props: PageProps<RecievedImage | undefined>) => {
  return <div>"Hello"</div>;
};
export default Page;
