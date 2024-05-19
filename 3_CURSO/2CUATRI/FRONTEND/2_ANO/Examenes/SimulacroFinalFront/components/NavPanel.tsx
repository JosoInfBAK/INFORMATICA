import { FunctionComponent } from "preact";
type Props = {
    userName: string;
  };
const NavPanel: FunctionComponent<Props> = ({ userName }) => {
  return (
    <nav className="nav-panel">
      <h2>Welcome, {userName}</h2>
      
      <a href="/videos">Videos</a>
      <a href="/favs">Favorites</a>
      <a href="/logout">Logout</a>
    </nav>
  );
};

export default NavPanel;
