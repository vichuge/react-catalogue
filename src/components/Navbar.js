import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../imgs/logo.png';

// The LEDs blink while the Pokédex is fetching data, like the real device.
const selectBusy = (state) => state.pokemons.status === 'loading'
  || Object.values(state.profile).some((entry) => entry.status === 'loading');

function Navbar() {
  const busy = useSelector(selectBusy);
  return (
    <header className={`dex-header ${busy ? 'is-busy' : ''}`}>
      <svg className="dex-header__ridge" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true">
        <path className="dex-header__cap" d="M0 0H1000V70H560C500 70 470 128 410 128H0Z" />
        <path className="dex-header__line" d="M0 128H410C470 128 500 70 560 70H1000" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="dex-header__inner">
        <Link to="/" className="dex-header__lights" aria-label="Go to the Pokédex home">
          <span className="lens" />
          <span className="led led--red" />
          <span className="led led--yellow" />
          <span className="led led--green" />
        </Link>
        <Link to="/" className="dex-header__logo">
          <img src={logo} alt="Pokédex" width="387" height="140" />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
