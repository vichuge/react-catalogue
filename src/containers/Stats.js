import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
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
    if (pokemon.types[1]) {
      type2 = pokemon.types[1].type.name;
    }
  }
  let height = pokemon.height * 0.1;
  height = Math.round(height * 10) / 10;
  let weight = pokemon.weight * 0.1;
  weight = Math.round(weight * 10) / 10;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;
  return (
    <>
      <Link to="/react-catalogue/"><i className="fas fa-caret-left fa-5x tri-stats" /></Link>
      <div className="row justify-content-center">
        <div className="col-12 div-element-stats">
          <img src={img} alt={pokemon.name} className="list-img img-fluid img-stats" />
        </div>
        <div className="col-12 d-flex justify-content-around align-items-center content-1">
          <p className="text-name">{`#${pokemon.id} ${pokemon.name}`}</p>
          <i className="fas fa-plus fa-5x" />
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-12 d-flex justify-content-around align-items-center content-1">
          <p className="text-types">
            {`height: ${height}m`}
            <br />
            {`weight: ${weight}Kg`}
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6 d-flex justify-content-around align-items-center content-1">
          <p className="text-name">{type1}</p>
        </div>
        <div className="col-12 col-sm-6 d-flex justify-content-around align-items-center content-1">
          <p className="text-name">{type2}</p>
        </div>
      </div>
    </>
  );
};

Stats.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    status: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
