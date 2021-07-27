import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Element = ({ num, name, img }) => (
  <div className="col-4 col-sm-3 col-md-2 div-element">
    <img src={img} alt="abc" className="list-img img-fluid" />
    <div className="row">
      <h6 className="list-name">{name}</h6>
    </div>
    <div className="row">
      <Link to={`/react-catalogue/pokemonid/${num}`} className="btn btn-primary btn-sm btn-element">Show</Link>
    </div>
  </div>
);

Element.propTypes = {
  num: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Element;
