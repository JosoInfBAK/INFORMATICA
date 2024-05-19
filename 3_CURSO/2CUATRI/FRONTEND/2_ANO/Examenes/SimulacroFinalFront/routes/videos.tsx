import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoList from "../components/VideoList.tsx";
import { Video } from "../types.tsx";

type State = {
  id: string;
  name: string;
  email: string;
};

type Data = {
  videos: Video[];
  userid: string;
};

export const handler: Handlers<Data, State> = {
  GET: async (req: Request, ctx: FreshContext<State, Data>) => {
    const userid = ctx.state.id;
    console.log(ctx.state);
    const API_URL = "https://videoapp-api.deno.dev";
    if (!API_URL) {
      throw new Error("API_URL is not set in the environment");
    }
    const response = await fetch(`${API_URL}/videos/${userid}`);
    if (response.status !== 200) {
      return ctx.render({ videos: [], userid: "" });
    }
    const videos: Video[] = await response.json();

    return ctx.render({ videos, userid });
  },
};

const Page = (props: PageProps<Data>) => (
  <div class="video-page">
    <h1 className="video-list-title">Videos</h1>
    <VideoList videos={props.data.videos} userid={props.data.userid} />
  </div>
);

export default Page;
