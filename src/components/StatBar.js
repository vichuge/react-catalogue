import PropTypes from 'prop-types';

const labels = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const MAX_STAT = 255;

const colorFor = (value) => {
  if (value < 50) return '#f34444';
  if (value < 80) return '#ff9a3c';
  if (value < 100) return '#ffd93d';
  if (value < 130) return '#a0e515';
  return '#23cd5e';
};

function StatBar({ name, value }) {
  return (
    <div className="stat">
      <span className="stat__label">{labels[name] || name}</span>
      <span className="stat__value">{value}</span>
      <div className="stat__track" role="meter" aria-valuemin={0} aria-valuemax={MAX_STAT} aria-valuenow={value} aria-label={labels[name] || name}>
        <span className="stat__fill" style={{ '--w': `${(value / MAX_STAT) * 100}%`, '--c': colorFor(value) }} />
      </div>
    </div>
  );
}

StatBar.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default StatBar;
