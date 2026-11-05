import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PokemonImage from './PokemonImage';
import TypeBadge from './TypeBadge';
import typeColors from '../constants/types';
import { spriteUrl, artworkUrl } from '../api/pokeapi';
import { formatName, formatNumber } from '../utils/format';

function PokemonCard({ id, name, types }) {
  const displayName = formatName(name);
  const color = typeColors[types[0]] || '#9099a1';
  return (
    <Link to={`/pokemon/${id}`} className="card" style={{ '--card-color': color }}>
      <span className="card__number">{formatNumber(id)}</span>
      <div className="card__art">
        <PokemonImage sources={[spriteUrl(id), artworkUrl(id)]} alt={displayName} pixelated />
      </div>
      <h2 className="card__name">{displayName}</h2>
      <div className="card__types">
        {types.map((t) => <TypeBadge key={t} type={t} size="md" />)}
      </div>
    </Link>
  );
}

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(PokemonCard);
