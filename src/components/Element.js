import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Element = ({ num, name, img }) => (
  <Link to={`/react-catalogue/pokemonid/${num}`} className="col-10 col-sm-3 col-md-2 div-element a-element">
    <img src={img} alt="abc" className="list-img img-fluid" />
    <div className="row">
      <h6 className="list-name">{name}</h6>
    </div>
  </Link>
);

Element.propTypes = {
  num: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Element;
