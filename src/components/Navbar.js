import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

function Navbar() {
  return (
    <header className="dex-header">
      <div className="dex-header__inner">
        <Link to="/" className="dex-header__lights" aria-label="Go to the Pokédex home">
          <span className="lens" />
          <span className="light light--red" />
          <span className="light light--yellow" />
          <span className="light light--green" />
        </Link>
        <Link to="/" className="dex-header__logo">
          <img src={logo} alt="Pokédex" width="387" height="140" />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
