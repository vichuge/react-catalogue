import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';
import { restartProfile } from '../redux/actions';

const Home = ({ profile, restartProfile, pokemons }) => {
  if (profile.status === true) {
    restartProfile();
  }
  const list = pokemons.results;
  return (
    <>
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
  pokemons: PropTypes.shape({
    results: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }).isRequired,
  restartProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    status: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
  profile: state.profile,
});

const mapDistpachToProps = {
  restartProfile,
};

export default connect(mapStateToProps, mapDistpachToProps)(Home);
