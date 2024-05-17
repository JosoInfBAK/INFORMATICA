import {
  FreshContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import LoginForm from "../islands/LoginForm.tsx";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";
import SignInFrom from "../islands/SignInForm.tsx";
export type Data = {
  message: string;
  token?: string;
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const checkUsernameInfile = await Deno.readTextFile("db.json").catch(
      () => null,
    );
    if (checkUsernameInfile) {
      const checkUsernameInfileJson = JSON.parse(checkUsernameInfile);
      if (checkUsernameInfileJson.email == email) {
        if (checkUsernameInfileJson.password == password) {
          const JWT_SECRET = Deno.env.get("JWT_SECRET");
          if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not set in the environment");
          }
          const token = jwt.sign({ email }, JWT_SECRET);
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
          console.log("User exists");

          return new Response(null, {
            status: 303,
            headers: new Headers({
              "Location": "/HiddenAccesPage",
            }),
          });
        } else {
          console.log("Password is incorrect");
          return ctx.render({ message: "Password is incorrect" });
        }
      }
    }
    console.log("User does not exist");
    return ctx.render({ message: "User does not exist" });
  },
};

const Page = (props: PageProps) => {
  const data: Data = props.data;
  return (
    <div>
      <h1>Log In</h1>
      {data
        ? (
          <div>
            <h1>{data.message}</h1>
            <h1>{data.token}</h1>
          </div>
        )
        : <LoginForm />}
    </div>
  );
};
export default Page;
