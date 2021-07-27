import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';
import { getPokemons } from '../redux/actions';

const Home = ({ getPokemons }) => {
  const pokemons = getPokemons();
  console.log(pokemons);
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2>Welcome to our page!</h2>
        </div>
      </div>
      <div className="row">
        <Element
          num="1"
          name="bulbasaur"
          img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
        />
      </div>
    </>
  );
};

Home.propTypes = {
  // pokemons: PropTypes.arrayOf(PropTypes.oneOfType([
  // PropTypes.number, PropTypes.string, PropTypes.object])).isRequired,
  getPokemons: PropTypes.func.isRequired,
};

const mapDistpachToProps = {
  getPokemons,
};

export default connect(null, mapDistpachToProps)(Home);
