import { useSignal } from "@preact/signals";
import LoginForm from "../islands/LoginForm.tsx";
import RegisterForm from "../islands/RegisterForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const name = form.get("fullName")?.toString();
    const registererror = false;
    console.log("Register", email);
    const url = new URL(req.url);
    console.log("Registering");
    const response = await fetch("https://videoapp-api.deno.dev/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    if (!response.ok) {
        console.log("Error registering");
        console.log(response.status);
        return ctx.render({ registererror: true });
    }
    const user = await response.json();
    console.log(response.status);
    console.log("Registered as", user);

    return ctx.render();
  },
};

export default function Home(props: { registererror: boolean }) {
  return (
    <div class="LoginPage">
      <RegisterForm />
    </div>
  );
}
