import { useSignal } from "@preact/signals";
import LoginForm from "../islands/LoginForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { setCookie } from "$std/http/cookie.ts";
import type { User } from "../types.tsx";


export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const url = new URL(req.url);
    const response = await fetch(
      "https://videoapp-api.deno.dev/checkuser", // body
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    console.log(response);
    if (response.status == 404) {
      console.log("Incorrect credentials or user does not exist");
      return ctx.render({
        message: "Incorrect credentials or user does not exist",
      });
    }
    const JWT_SECRET = Deno.env.get("JWT_SECRET");
    const user = await response.json();
    const data: Omit<User, "password" | "favs"> = user;
    const token = jwt.sign(
      {
        name: user.name,
        email,
        password,
        id: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );
    const headers = new Headers();
    setCookie(headers, {
      name: "auth",
      sameSite: "Lax",
      value: token,
      path: "/",
      secure: true,
    });
    headers.set("location", "/videos");
    console.log("Logged in as", user);
    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  },
};

export default function Home() {
  return (
    <div class="LoginPage">
      <LoginForm />
    </div>
  );
}
