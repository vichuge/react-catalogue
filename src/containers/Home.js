import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';

const Home = ({ pokemons }) => {
  console.log(pokemons[0]);
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
        {pokemons.map((pokemon) => (
          <Element
            key={pokemon.id}
            num={pokemon.id}
            name={pokemon.name}
            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
          />
        ))}
      </div>
    </>
  );
};

Home.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number, PropTypes.string, PropTypes.object])).isRequired,
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

export default connect(mapStateToProps, null)(Home);
