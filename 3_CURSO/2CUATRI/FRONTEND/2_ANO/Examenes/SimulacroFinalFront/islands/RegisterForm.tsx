import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

const RegisterForm: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form className="RegisterForm" action="/Register" method="POST">
      <h1>Register</h1>
      Full Name
      <input
        type="text"
        name="fullName"
        value={fullName}
        className="InputLogin"
        onInput={(event) =>
          setFullName((event.target as HTMLInputElement).value)}
      />
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

      <button type="submit" disabled={loading} className="LoginButton">
        {loading ? "Loading..." : "Register"}
      </button>
      <p>
        Already have an account? <a href="/Login" className="Link">Login</a>
      </p>
    </form>
  );
};
export default RegisterForm;
