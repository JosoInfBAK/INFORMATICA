import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

const SignInFrom :FunctionComponent = () => {
    return (
        <div className="SignInComponent">
            <h1>Sign In</h1>
            <form className="LoginForm" action="/signin" method="POST">
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
export default SignInFrom;