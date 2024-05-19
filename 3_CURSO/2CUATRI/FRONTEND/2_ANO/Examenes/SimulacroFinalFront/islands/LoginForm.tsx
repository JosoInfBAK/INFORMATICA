import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="LoginForm" action="/Login" method="POST">
      <h1>Login</h1>
      Email
      <input
        type="text"
        value={email}
        name="email"
        className="InputLogin"
        onInput={(event) => setEmail((event.target as HTMLInputElement).value)}
      />

      Password
      <input
        type="password"
        name="password"
        value={password}
        className="InputLogin"
        onInput={(event) =>
          setPassword((event.target as HTMLInputElement).value)}
      />

      <button type="submit" className="LoginButton">
        Login
      </button>
      <p>
        Don't have an account? <a href="/Register" className="Link">Register</a>
      </p>
    </form>
  );
};
export default LoginForm;
