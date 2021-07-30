import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

const Navbar = () => (
  <nav className="navbar row">
    <div className="col-12 col-xs-6 col-sm-8">
      <Link to="/"><i className="far fa-circle fa-5x big-circle" /></Link>
      <i className="fas fa-circle red" />
      <i className="fas fa-circle green" />
      <i className="fas fa-circle yellow" />
    </div>
    <div className="col-12 col-xs-6 col-sm-4 d-flex justify-content-start justify-content-md-end">
      <img src={logo} alt="pokedex" className="nav-img" />
    </div>
    <div className="col-12">
      <hr className="hr" />
    </div>
  </nav>
);

export default Navbar;
