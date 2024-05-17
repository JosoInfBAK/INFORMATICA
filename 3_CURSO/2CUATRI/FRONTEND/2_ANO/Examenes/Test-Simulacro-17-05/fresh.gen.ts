// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $HiddenAccesPage from "./routes/HiddenAccesPage.tsx";
import * as $MainPage from "./routes/MainPage.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $signin from "./routes/signin.tsx";
import * as $LoginForm from "./islands/LoginForm.tsx";
import * as $SignInForm from "./islands/SignInForm.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/HiddenAccesPage.tsx": $HiddenAccesPage,
    "./routes/MainPage.tsx": $MainPage,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.tsx": $_middleware,
    "./routes/api/joke.ts": $api_joke,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/signin.tsx": $signin,
  },
  islands: {
    "./islands/LoginForm.tsx": $LoginForm,
    "./islands/SignInForm.tsx": $SignInForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;