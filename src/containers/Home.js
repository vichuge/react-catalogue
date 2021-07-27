import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';
// import { getPokemons } from '../redux/actions';

const Home = ({ /* getPokemons, */ pokemons }) => {
  console.log(pokemons);
  const list = pokemons.results;
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2>Welcome to our page!</h2>
        </div>
      </div>
      <div className="row">
        {list.map((pokemon, index) => (
          <Element
            key={pokemon.name}
            num={index + 1}
            name={pokemon.name}
            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${index + 1}.gif`}
          />
        ))}
      </div>
    </>
  );
};

Home.propTypes = {
  pokemons: PropTypes.objectOf(PropTypes.array).isRequired,
  // getPokemons: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

/* const mapDistpachToProps = {
  getPokemons,
}; */

export default connect(mapStateToProps/* , mapDistpachToProps */)(Home);
