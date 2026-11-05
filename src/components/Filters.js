import PropTypes from 'prop-types';
import generations from '../constants/generations';
import typeColors, { typeNames } from '../constants/types';
import Icon from './Icon';

const allKey = {
  id: 'All', short: 'ALL', label: 'All generations', region: 'National',
};

const keys = [allKey, ...generations.map((g) => ({
  id: g.id,
  short: g.label.replace('Gen ', ''),
  label: `${g.label} · ${g.region}`,
  region: g.region,
}))];

function Filters({
  filter, onChange, onReset, shown, total,
}) {
  const { generation, type, query } = filter;
  const isFiltered = generation !== 'All' || type !== 'All' || query !== '';

  return (
    <section className="controls" aria-label="Filter Pokémon">
      <div className="lcd lcd--green controls__lcd">
        <div className="lcd__search">
          <Icon name="search" size={18} className="lcd__icon" />
          <input
            type="search"
            className="lcd__input"
            placeholder="Name or No."
            value={query}
            onChange={(e) => onChange({ query: e.target.value })}
            aria-label="Search by name or number"
            spellCheck="false"
            autoComplete="off"
          />
          {query && (
            <button type="button" className="lcd__clear" onClick={() => onChange({ query: '' })} aria-label="Clear search">
              <Icon name="close" size={14} />
            </button>
          )}
        </div>
        <div className="lcd__line">
          <label htmlFor="type-filter" className="lcd__type">
            <span className="lcd__dot" style={{ '--type-color': typeColors[type] || 'transparent' }} />
            Type:
            <select id="type-filter" value={type} onChange={(e) => onChange({ type: e.target.value })}>
              <option value="All">All</option>
              {typeNames.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="lcd__line" aria-live="polite">
          {total ? `Found: ${shown}/${total}` : 'Booting Pokédex…'}
          {isFiltered && (
            <button type="button" className="lcd__reset" onClick={onReset}>Clear filters</button>
          )}
        </p>
      </div>

      <div className="keypad" role="group" aria-label="Generation">
        {keys.map((k) => (
          <button
            key={k.id}
            type="button"
            className={`key ${generation === k.id ? 'is-active' : ''}`}
            aria-pressed={generation === k.id}
            aria-label={k.label}
            title={k.label}
            onClick={() => onChange({ generation: k.id })}
          >
            <span className="key__main">{k.short}</span>
            <span className="key__sub">{k.region}</span>
          </button>
        ))}
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
  shown: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Filters;
