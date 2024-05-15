import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.2/src/index.js";

type Props = {
    // props here
};

const LoginForm:FunctionComponent = (props:Props) => {
  return (
    <div className="FormIsland">
      <form action="/login" method="post">
        <input className="inputlogin" type="text" name="username" placeholder="Username" />
        <input className="inputlogin" name="password"type="password" placeholder="Password" />
        <button className="buttonlogin" type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginForm;