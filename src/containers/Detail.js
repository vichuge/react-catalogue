import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import PokemonImage from '../components/PokemonImage';
import StatBar from '../components/StatBar';
import TypeBadge from '../components/TypeBadge';
import typeColors from '../constants/types';
import { generationOf, TOTAL_POKEMON } from '../constants/generations';
import { loadProfile } from '../redux/actions';
import { spriteUrl, artworkUrl } from '../api/pokeapi';
import { formatName, formatNumber } from '../utils/format';

const genderLabel = (rate) => {
  if (rate === -1) return ['Genderless'];
  const female = (rate / 8) * 100;
  return [`♂ ${100 - female}%`, `♀ ${female}%`];
};

function NavButton({ pokemon = null, direction }) {
  if (!pokemon) return <span className="detail-nav__spacer" />;
  return (
    <Link to={`/pokemon/${pokemon.id}`} className={`detail-nav__link detail-nav__link--${direction}`}>
      {direction === 'prev' && <Icon name="back" />}
      <span>
        <small>{formatNumber(pokemon.id)}</small>
        {formatName(pokemon.name)}
      </span>
      {direction === 'next' && <Icon name="next" />}
    </Link>
  );
}

NavButton.propTypes = {
  pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
};

function Evolutions({ stages, currentId }) {
  if (stages.length < 2) {
    return <p className="muted">This Pokémon does not evolve.</p>;
  }
  return (
    <ol className="evolutions">
      {stages.map((stage, i) => (
        // Stages have no stable id other than their position in the chain.
        // eslint-disable-next-line react/no-array-index-key
        <li key={i} className="evolutions__stage">
          {i > 0 && <Icon name="next" className="evolutions__arrow" />}
          <div className="evolutions__options">
            {stage.map((p) => (
              <Link
                key={p.id}
                to={`/pokemon/${p.id}`}
                className={`evolutions__item ${p.id === currentId ? 'is-current' : ''}`}
                aria-current={p.id === currentId ? 'page' : undefined}
              >
                <PokemonImage
                  sources={[spriteUrl(p.id), artworkUrl(p.id)]}
                  alt={formatName(p.name)}
                  pixelated
                />
                <span>{formatName(p.name)}</span>
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

Evolutions.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }))).isRequired,
  currentId: PropTypes.number.isRequired,
};

function Detail() {
  const params = useParams();
  const id = Number(params.id);
  const valid = Number.isInteger(id) && id >= 1 && id <= TOTAL_POKEMON;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const entry = useSelector((state) => state.profile[id]);
  const items = useSelector((state) => state.pokemons.items);
  const [shiny, setShiny] = useState(false);
  const [artwork, setArtwork] = useState(false);
  const audio = useRef(null);

  // The index is sorted by national number, so neighbours are just ±1.
  const prev = useMemo(() => (valid && id > 1 ? (items[id - 2] || { id: id - 1, name: '' }) : null), [items, id, valid]);
  const next = useMemo(() => (valid && id < TOTAL_POKEMON ? (items[id] || { id: id + 1, name: '' }) : null), [items, id, valid]);

  useEffect(() => {
    if (valid) dispatch(loadProfile(id));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [dispatch, id, valid]);

  // Warm the cache for the neighbours so prev/next feel instant.
  const loaded = Boolean(entry && entry.status === 'succeeded');
  useEffect(() => {
    if (!loaded) return;
    if (prev) dispatch(loadProfile(prev.id));
    if (next) dispatch(loadProfile(next.id));
  }, [dispatch, loaded, prev, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowLeft' && prev) navigate(`/pokemon/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/pokemon/${next.id}`);
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, prev, next]);

  const data = entry && entry.data;
  const total = useMemo(() => (data ? data.stats.reduce((sum, s) => sum + s.value, 0) : 0), [data]);

  if (!valid) {
    return (
      <div className="empty">
        <p className="empty__title">That Pokémon is not in the Pokédex.</p>
        <Link to="/" className="button">Back to the list</Link>
      </div>
    );
  }

  const header = (
    <nav className="detail-nav" aria-label="Pokémon navigation">
      <NavButton pokemon={prev} direction="prev" />
      <Link to="/" className="detail-nav__home">All Pokémon</Link>
      <NavButton pokemon={next} direction="next" />
    </nav>
  );

  if (!entry || entry.status === 'loading' || entry.status === 'idle') {
    return (
      <>
        {header}
        <div className="detail detail--loading" aria-busy="true">
          <div className="detail__screen"><span className="pokeball-spinner" /></div>
          <div className="detail__panel">
            <div className="skeleton-line skeleton-line--lg" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-line--sm" />
          </div>
        </div>
      </>
    );
  }

  if (entry.status === 'failed') {
    return (
      <>
        {header}
        <div className="empty">
          <p className="empty__title">Could not load this Pokémon.</p>
          <p>{entry.error}</p>
          <button type="button" className="button" onClick={() => dispatch(loadProfile(id))}>Try again</button>
        </div>
      </>
    );
  }

  const name = formatName(data.name);
  const gen = generationOf(data.id);
  const mainColor = typeColors[data.types[0]] || '#9099a1';
  const altColor = typeColors[data.types[1]] || mainColor;
  const animated = shiny ? data.sprites.animatedShiny : data.sprites.animated;
  const art = shiny ? data.sprites.artworkShiny : data.sprites.artwork;
  const sources = artwork ? [art, animated] : [animated, art];

  const playCry = () => {
    if (!data.cry) return;
    if (audio.current) audio.current.pause();
    audio.current = new Audio(data.cry);
    audio.current.volume = 0.4;
    audio.current.play().catch(() => {});
  };

  return (
    <>
      {header}
      <article className="detail" style={{ '--main': mainColor, '--alt': altColor }}>
        <div className="detail__screen">
          <div className="detail__screen-frame">
            <span className="detail__screen-dot" />
            <span className="detail__screen-dot" />
            <div className="detail__display">
              <PokemonImage
                key={sources.join()}
                sources={sources}
                alt={name}
                className={artwork || !animated ? 'detail__art' : 'detail__sprite'}
                pixelated={!artwork && !!animated}
                lazy={false}
              />
            </div>
          </div>
          <div className="detail__controls">
            <button type="button" className={`round-button ${shiny ? 'is-active' : ''}`} onClick={() => setShiny((s) => !s)} aria-pressed={shiny} title="Shiny">
              <Icon name="sparkle" />
              <span>Shiny</span>
            </button>
            <button type="button" className={`round-button ${artwork ? 'is-active' : ''}`} onClick={() => setArtwork((a) => !a)} aria-pressed={artwork} title="Official artwork">
              <Icon name="image" />
              <span>Artwork</span>
            </button>
            <button type="button" className="round-button" onClick={playCry} disabled={!data.cry} title="Play cry">
              <Icon name="sound" />
              <span>Cry</span>
            </button>
          </div>
        </div>

        <div className="detail__panel">
          <header className="detail__title">
            <span className="detail__number">{formatNumber(data.id)}</span>
            <h1>{name}</h1>
            {data.genus && <p className="detail__genus">{data.genus}</p>}
            <div className="detail__types">
              {data.types.map((t) => <TypeBadge key={t} type={t} size="md" />)}
              {data.isLegendary && <span className="tag tag--gold">Legendary</span>}
              {data.isMythical && <span className="tag tag--purple">Mythical</span>}
            </div>
          </header>

          {data.flavor && <p className="detail__flavor">{data.flavor}</p>}

          <dl className="facts">
            <div>
              <dt>Height</dt>
              <dd>{`${data.height.toFixed(1)} m`}</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd>{`${data.weight.toFixed(1)} kg`}</dd>
            </div>
            <div>
              <dt>Generation</dt>
              <dd>{gen ? `${gen.label} · ${gen.region}` : '—'}</dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>
                {genderLabel(data.genderRate).map((g) => <span key={g} className="gender">{g}</span>)}
              </dd>
            </div>
            <div>
              <dt>Abilities</dt>
              <dd>
                {data.abilities.map((a) => (
                  <span key={a.name} className={`ability ${a.hidden ? 'ability--hidden' : ''}`} title={a.hidden ? 'Hidden ability' : undefined}>
                    {formatName(a.name)}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Capture rate</dt>
              <dd>{data.captureRate}</dd>
            </div>
          </dl>
        </div>

        <section className="detail__section">
          <h2>Base stats</h2>
          <div className="stats">
            {data.stats.map((s) => <StatBar key={s.name} name={s.name} value={s.value} />)}
            <div className="stat stat--total">
              <span className="stat__label">Total</span>
              <span className="stat__value">{total}</span>
            </div>
          </div>
        </section>

        <section className="detail__section">
          <h2>Evolution chain</h2>
          <Evolutions stages={data.evolutions} currentId={data.id} />
        </section>
      </article>
      <p className="hint">Tip: use ← → to browse and Esc to go back.</p>
    </>
  );
}

export default Detail;
