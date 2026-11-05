import PropTypes from 'prop-types';
import typeColors from '../constants/types';

function TypeBadge({ type, size = 'sm' }) {
  return (
    <span className={`type-badge type-badge--${size}`} style={{ '--type-color': typeColors[type] || '#777' }}>
      {type}
    </span>
  );
}

TypeBadge.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
};

export default TypeBadge;
