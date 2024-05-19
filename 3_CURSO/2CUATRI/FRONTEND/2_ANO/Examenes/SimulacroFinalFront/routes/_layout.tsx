import { FreshContext } from "$fresh/server.ts";
import NavPanel from "../components/NavPanel.tsx";
import jwt from "jsonwebtoken";

export default async function Layout(req: Request, ctx: FreshContext) {
  console.log(ctx.state);
  const cookie = req.headers.get("cookie");
  const token = cookie?.split("=")[1];
  const decoded= jwt.decode(token);
  console.log(decoded);
  return (
    <div className="page-container">
      <NavPanel userName={`${ctx.state.name || "unknown"}`} />
      <ctx.Component />
    </div>
  );
}
