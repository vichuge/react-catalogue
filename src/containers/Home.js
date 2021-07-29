import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Element from '../components/Element';
import { restartProfile, getPokemons, changeFilter } from '../redux/actions';
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
    changeFilter(type);
  };
  console.log(filter);
  if (profile.status === true) {
    restartProfile();
  }
  let list = [];
  if (pokemons.status === false) {
    getPokemons();
  } else {
    list = pokemons.results;
    console.log(list);
    console.log(list[0]);
    console.log(list[0].type1);
    if (filter !== 'All') {
      // pkmns.results.map((pkmn) => (if (pkmn.type) { list.push(pkmn) }));
      console.log('Enter diff All');
      /* pokemons.results.map((pk) => (
        if (pk.types)
      )); */
      /* for (let i = 0; i < list.length; i += 1) {
        console.log(pokemons.results[i].type1);
        if (filter === pokemons.results[i].type1 || filter === pokemons.results[i].type2) {
          list.push(pokemons.results[i]);
        }
      } */
    }
  }
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-4">
          <CategoryFilter categoryFilterChange={changeF} />
        </div>
      </div>
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
};

export default connect(mapStateToProps, mapDistpachToProps)(Home);
