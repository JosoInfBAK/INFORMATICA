import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

const LoginForm :FunctionComponent = () => {
    return (
        <div className="loginComponent">
            <h1>Login</h1>
            <form className="LoginForm" action="/login" method="POST">
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginForm;