import { useSignal } from "@preact/signals";
import LoginForm from "../islands/LoginForm.tsx";
import SignInFrom from "../islands/SignInForm.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div className="MainPage">
      <a className="login" href="/login">Login</a>
      <a className="signin" href="/signin">Sign In</a>
    </div>
  );
}