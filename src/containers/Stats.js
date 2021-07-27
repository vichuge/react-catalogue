import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPokemon } from '../redux/actions';

const Stats = ({ getPokemon }) => {
  const { id } = useParams();
  const pokemon = getPokemon(id);
  console.log(pokemon);
  return (
    <>
      <h2>Pokémon stats!</h2>
      <p>{id}</p>
    </>
  );
};

Stats.propTypes = {
  getPokemon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getPokemon,
};

export default connect(null, mapDispatchToProps)(Stats);
