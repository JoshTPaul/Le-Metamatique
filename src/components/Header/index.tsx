import { Link } from "@tanstack/react-router";
import Nav from "./Extras";

function Header() {
  return (
    <header>
      <div>wasd</div>
      <h1>
        <Link to="/">LE METAMATIQUE</Link>
      </h1>
      <div>wasd</div>
      <aside id="navbar">
        <Nav />
      </aside>
    </header>
  );
}

export default Header;
