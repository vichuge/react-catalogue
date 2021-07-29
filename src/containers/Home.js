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

const Home = ({
  profile,
  restartProfile,
  pokemons,
  getPokemons,
  filter,
  changeFilter,
}) => {
  const changeF = (type) => {
    getPokemons(type);
    console.log(changeFilter);
  };
  console.log(filter);
  if (profile.status === true) {
    restartProfile();
  }
  let list = [];
  if (pokemons.status === false) {
    getPokemons(profile);
  } else {
    list = pokemons.results;
    console.log(list);
    console.log(list[0].url.split('/')[6]);
    console.log(list[0].url.substring(list[0].url.lastIndexOf('/')));
    console.log(list[1].url);
    console.log(list[1].url.lastIndexOf('/'));
  }
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6">
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
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
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
