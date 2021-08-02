import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { restartProfile } from '../redux/actions';

const Element = ({
  num,
  name,
  img,
  restartProfile,
}) => {
  const c = () => {
    restartProfile();
  };
  return (
    <Link to={`/pokemonid/${num}`} className="col-10 col-sm-3 col-md-2 div-element a-element" onClick={c}>
      <img src={img} alt="abc" className="list-img img-fluid" />
      <h6 className="list-name">{name}</h6>
    </Link>
  );
};

Element.propTypes = {
  num: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  restartProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  restartProfile,
};

export default connect(null, mapDispatchToProps)(Element);
