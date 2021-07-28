import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar row">
    <div className="col-12 mb-5">
      <Link to="/react-catalogue/"><i className="far fa-circle fa-5x big-circle" /></Link>
      <i className="fas fa-circle red" />
      <i className="fas fa-circle green" />
      <i className="fas fa-circle yellow" />
    </div>
    <hr className="hr" />
  </div>
);

export default Navbar;
