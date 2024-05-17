import {
  FreshContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import LoginForm from "../islands/LoginForm.tsx";
import { setCookie } from "$std/http/cookie.ts";
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
    const searchduplicateusername = await Deno.readTextFile("db.json").catch(
      () => null,
    );
    if (searchduplicateusername) {
      const searchduplicateusernamejson = JSON.parse(searchduplicateusername);
      if (searchduplicateusernamejson.email === email) {
        console.log("User already exists");
        return ctx.render({ message: "User already exists" });
      }
    }

    const insertintofile = await Deno.writeTextFile(
      "db.json",
      JSON.stringify({ email, password }),
    ).catch(() => null);

    const isindbfile = await Deno.stat("db.json").catch(() => null);
    const JWT_SECRET = Deno.env.get("JWT_SECRET");
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment");
    }
    const token = jwt.sign(
      {
        email,

      },
      Deno.env.get("JWT_SECRET"),
      {
        expiresIn: "24h",
      },
    );
    const headers = new Headers();

    // create JWT token and set it as a cookie

    setCookie(headers, {
      name: "auth",
      value: token,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    headers.set("location", "/HiddenAccesPage");
    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  }
};

const Page = (props: PageProps) => {
  const data: Data = props.data;
  return (
    <div>
      <h1>Sign In</h1>
      {data
        ? (
          <div>
            <h1>{data.message}</h1>
            <h1>{data.token}</h1>
          </div>
        )
        : <SignInFrom />}
    </div>
  );
};
export default Page;
