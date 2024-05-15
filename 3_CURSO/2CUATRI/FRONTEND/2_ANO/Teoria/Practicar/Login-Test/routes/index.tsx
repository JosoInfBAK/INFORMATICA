import { useSignal } from "@preact/signals";
import LoginForm from "../islands/LoginIsland.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { MongoClient } from "npm:mongodb@6.1.0";
import jwt from "jsonwebtoken";
import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { fromFileUrl } from "$std/path/from_file_url.ts";

export interface LoginResponse {
  _id: { $oid: string };
  username: string;
  password: string;
}
export interface Login {
  username: string;
  loggedin: boolean;
}

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const LoginData = await req.formData();
    const username = LoginData.get("username")?.toString() || "";
    const password = LoginData.get("password")?.toString() || "";
    const mongoURL = Deno.env.get("MONGO_URL");
    const mongourl = Deno.env.get("MONGO_DB");
    const url = new URL(req.url);
    const mongoClient = new MongoClient(mongoURL!);
    await mongoClient.connect();
    const db = mongoClient.db("login");
    const login = db.collection<LoginResponse>("login");
    const data = await login.find({ username: username, password: password });
    const userres = await data.toArray() as unknown as LoginResponse[];
    const user = userres[0];
    if (user) {
      const token = jwt.sign({ username: user.username }, Deno.env.get("JWT_SECRET")!);
      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      return ctx.render();
    }
  },
};

const Page = (props: PageProps<Login | undefined>) => {
  const userdata = {
    username: props.data?.username,
  };
  return (
    <div>
        hello {userdata.username}
      <LoginForm />
    </div>
  );
};

export default Page;
