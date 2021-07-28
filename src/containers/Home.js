import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';
import { restartProfile, getPokemons } from '../redux/actions';

const Home = ({
  profile,
  restartProfile,
  pokemons,
  getPokemons,
}) => {
  if (profile.status === true) {
    restartProfile();
  }
  let pkmns = '';
  let list = [];
  if (pokemons.status === false) {
    pkmns = getPokemons();
  } else {
    pkmns = pokemons;
    list = pkmns.results;
  }
  console.log(pkmns);
  return (
    <>
      <div className="row justify-content-center">
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
  pokemons: PropTypes.shape({
    results: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    status: PropTypes.bool,
  }).isRequired,
  getPokemons: PropTypes.func.isRequired,
  restartProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    status: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  pokemons: state.pokemons,
});

const mapDistpachToProps = {
  restartProfile,
  getPokemons,
};

export default connect(mapStateToProps, mapDistpachToProps)(Home);
