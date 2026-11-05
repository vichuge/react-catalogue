import PropTypes from 'prop-types';
import generations from '../constants/generations';
import typeColors, { typeNames } from '../constants/types';
import Icon from './Icon';

function Filters({ filter, onChange, onReset }) {
  const { generation, type, query } = filter;
  const isFiltered = generation !== 'All' || type !== 'All' || query !== '';

  return (
    <section className="filters" aria-label="Filter Pokémon">
      <div className="search">
        <Icon name="search" className="search__icon" />
        <input
          type="search"
          className="search__input"
          placeholder="Search by name or number…"
          value={query}
          onChange={(e) => onChange({ query: e.target.value })}
          aria-label="Search by name or number"
        />
        {query && (
          <button type="button" className="search__clear" onClick={() => onChange({ query: '' })} aria-label="Clear search">
            <Icon name="close" size={16} />
          </button>
        )}
      </div>

      <div className="chips" role="group" aria-label="Generation">
        {[{ id: 'All', label: 'All', region: 'National' }, ...generations].map((g) => (
          <button
            key={g.id}
            type="button"
            className={`chip ${generation === g.id ? 'is-active' : ''}`}
            aria-pressed={generation === g.id}
            onClick={() => onChange({ generation: g.id })}
            title={g.region}
          >
            <span className="chip__label">{g.label}</span>
            <span className="chip__region">{g.region}</span>
          </button>
        ))}
      </div>

      <div className="filters__row">
        <label className="select" htmlFor="type-filter" style={{ '--type-color': typeColors[type] || 'var(--ink-soft)' }}>
          <span className="select__dot" />
          <select id="type-filter" value={type} onChange={(e) => onChange({ type: e.target.value })}>
            <option value="All">All types</option>
            {typeNames.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </label>
        {isFiltered && (
          <button type="button" className="link-button" onClick={onReset}>Clear filters</button>
        )}
      </div>
    </section>
  );
}

Filters.propTypes = {
  filter: PropTypes.shape({
    generation: PropTypes.string,
    type: PropTypes.string,
    query: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Filters;
