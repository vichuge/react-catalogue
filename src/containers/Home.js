import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';
import {
  restartProfile,
  getPokemons,
  changeFilter,
  pkmnChangeStatus,
} from '../redux/actions';
import CategoryFilter from '../components/CategoryFilter';
import Navbar from '../components/Navbar';

const Home = ({
  profile,
  restartProfile,
  pokemons,
  getPokemons,
}) => {
  const changeF = (type) => {
    getPokemons(type);
  };
  if (profile.status === true) {
    restartProfile();
  }
  let list = [];
  if (pokemons.status === false) {
    getPokemons(profile);
  } else {
    list = pokemons.results;
  }
  return (
    <>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-11 col-sm-6">
          <CategoryFilter categoryFilterChange={changeF} />
        </div>
      </div>
      <div className="row justify-content-center">
        {list.map((pokemon) => (
          <Element
            key={pokemon.name}
            num={pokemon.url.split('/')[6]}
            name={pokemon.name}
            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.url.split('/')[6]}.gif`}
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
  filter: state.filter,
});

const mapDistpachToProps = {
  restartProfile,
  getPokemons,
  changeFilter,
  pkmnChangeStatus,
};

export default connect(mapStateToProps, mapDistpachToProps)(Home);
