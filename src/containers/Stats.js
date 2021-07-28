import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../redux/actions';

const Stats = ({ profile, getProfile }) => {
  const { id } = useParams();
  let type1 = '';
  let type2 = '';
  let pokemon = '';
  if (profile.status === false) {
    pokemon = getProfile(id);
  } else {
    pokemon = profile;
    type1 = pokemon.types[0].type.name;
    type2 = pokemon.types[1].type.name;
  }
  return (
    <>
      <h2>{pokemon.name}</h2>
      <p>{pokemon.id}</p>
      <p>{pokemon.height}</p>
      <p>{pokemon.weight}</p>
      <p>{type1}</p>
      <p>{type2}</p>
    </>
  );
};

Stats.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
