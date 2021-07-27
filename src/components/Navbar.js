import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="Navbar">
    <h1>Pokedex!</h1>
    <p>
      <Link to="/react-catalogue/">Home</Link>
    </p>
  </div>
);

export default Navbar;
