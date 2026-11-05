import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bezel from '../components/Bezel';
import Icon from '../components/Icon';
import PokemonImage from '../components/PokemonImage';
import typeColors from '../constants/types';
import { generationOf, TOTAL_POKEMON } from '../constants/generations';
import { loadProfile } from '../redux/actions';
import { spriteUrl, artworkUrl } from '../api/pokeapi';
import { formatName, formatNumber } from '../utils/format';

const MAX_STAT = 255;

const statLabels = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPEED',
};

const statColor = (value) => {
  if (value < 50) return '#f34444';
  if (value < 80) return '#ff9a3c';
  if (value < 100) return '#ffd93d';
  if (value < 130) return '#a0e515';
  return '#23cd5e';
};

const genderLabel = (rate) => {
  if (rate === -1) return ['Genderless'];
  const female = (rate / 8) * 100;
  // The pixel font has no ♂/♀ glyphs, so spell them out for the LCD.
  return [`M ${100 - female}%`, `F ${female}%`];
};

function StatKey({
  label, value, display = null, ratio = null, color = null,
}) {
  return (
    <div className="stat-key">
      <span className="stat-key__label">{label}</span>
      <span className="stat-key__value">{display || value}</span>
      {ratio !== null && (
        <span className="stat-key__bar" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={MAX_STAT} aria-valuenow={value}>
          <span style={{ '--w': `${Math.min(ratio, 1) * 100}%`, '--c': color }} />
        </span>
      )}
    </div>
  );
}

StatKey.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  display: PropTypes.string,
  ratio: PropTypes.number,
  color: PropTypes.string,
};

function WhiteKey({ pokemon = null, direction }) {
  if (!pokemon) return <span className="white-key is-disabled" aria-hidden="true" />;
  return (
    <Link to={`/pokemon/${pokemon.id}`} className={`white-key white-key--${direction}`} title={direction === 'prev' ? 'Previous Pokémon (←)' : 'Next Pokémon (→)'}>
      {direction === 'prev' && <Icon name="back" size={16} />}
      <span className="white-key__text">
        <small>{formatNumber(pokemon.id)}</small>
        {' '}
        {formatName(pokemon.name)}
      </span>
      {direction === 'next' && <Icon name="next" size={16} />}
    </Link>
  );
}

WhiteKey.propTypes = {
  pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
};

function Dpad({
  onUp, onDown, onLeft = undefined, onRight = undefined,
}) {
  return (
    <div className="dpad" role="group" aria-label="Directional pad">
      <button type="button" className="dpad__btn dpad__btn--up" onClick={onUp} aria-label="Toggle shiny" title="Shiny" />
      <button type="button" className="dpad__btn dpad__btn--left" onClick={onLeft} aria-label="Previous Pokémon" title="Previous" disabled={!onLeft} />
      <span className="dpad__center" />
      <button type="button" className="dpad__btn dpad__btn--right" onClick={onRight} aria-label="Next Pokémon" title="Next" disabled={!onRight} />
      <button type="button" className="dpad__btn dpad__btn--down" onClick={onDown} aria-label="Toggle artwork" title="Artwork" />
    </div>
  );
}

Dpad.propTypes = {
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onLeft: PropTypes.func,
  onRight: PropTypes.func,
};

function Evolutions({ stages, currentId }) {
  if (stages.length < 2) {
    return <p className="evo__empty">This Pokémon does not evolve.</p>;
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

function TypeScreen({ type = null }) {
  return (
    <div className="mini-screen" style={{ '--type-color': type ? typeColors[type] : 'transparent' }}>
      {type ? (
        <>
          <span className="mini-screen__dot" />
          {type}
        </>
      ) : <span className="mini-screen__none">— — —</span>}
    </div>
  );
}

TypeScreen.propTypes = {
  type: PropTypes.string,
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

  const goPrev = useCallback(() => prev && navigate(`/pokemon/${prev.id}`), [navigate, prev]);
  const goNext = useCallback(() => next && navigate(`/pokemon/${next.id}`), [navigate, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, goPrev, goNext]);

  const data = loaded ? entry.data : null;
  const status = entry ? entry.status : 'loading';
  const total = useMemo(() => (data ? data.stats.reduce((sum, s) => sum + s.value, 0) : 0), [data]);

  if (!valid) {
    return (
      <Bezel className="bezel--list">
        <div className="empty">
          <p className="empty__title">That Pokémon is not in the Pokédex.</p>
          <Link to="/" className="button">Back to the list</Link>
        </div>
      </Bezel>
    );
  }

  const name = data ? formatName(data.name) : '';
  const gen = generationOf(id);
  const mainColor = data ? typeColors[data.types[0]] : '#3a4a8a';
  const animated = data && (shiny ? data.sprites.animatedShiny : data.sprites.animated);
  const art = data && (shiny ? data.sprites.artworkShiny : data.sprites.artwork);
  const sources = artwork ? [art, animated] : [animated, art];

  const playCry = () => {
    if (!data || !data.cry) return;
    if (audio.current) audio.current.pause();
    audio.current = new Audio(data.cry);
    audio.current.volume = 0.4;
    audio.current.play().catch(() => {});
  };

  const randomPokemon = () => {
    let target = id;
    while (target === id) target = 1 + Math.floor(Math.random() * TOTAL_POKEMON);
    navigate(`/pokemon/${target}`);
  };

  let caption = 'Identifying Pokémon…';
  if (status === 'failed') caption = 'Signal lost…';
  if (data) caption = `No.${String(data.id).padStart(4, '0')} ${name}`;

  let photo = <span className="pokeball-spinner" />;
  if (status === 'failed') photo = <span className="poke-img-fallback" />;
  if (data) {
    photo = (
      <PokemonImage
        key={sources.join()}
        sources={sources}
        alt={name}
        className={artwork || !animated ? 'photo__art' : 'photo__sprite'}
        pixelated={!artwork && !!animated}
        lazy={false}
      />
    );
  }

  let info;
  if (status === 'failed') {
    info = (
      <div className="info info--message">
        <p className="info__title">Could not load this Pokémon.</p>
        <p>{entry.error}</p>
        <button type="button" className="button" onClick={() => dispatch(loadProfile(id))}>Try again</button>
      </div>
    );
  } else if (!data) {
    info = (
      <div className="info info--message" aria-busy="true">
        <p className="info__title blink">Searching database…</p>
      </div>
    );
  } else {
    info = (
      <div className="info">
        <span className="info__number">{formatNumber(data.id)}</span>
        <h1 className="info__name">{name}</h1>
        <p className="info__genus">
          {data.genus}
          {data.isLegendary && <span className="tag tag--gold">Legendary</span>}
          {data.isMythical && <span className="tag tag--purple">Mythical</span>}
        </p>
        {data.flavor && <p className="info__flavor">{data.flavor}</p>}
      </div>
    );
  }

  return (
    <>
      <article className={`pokedex ${data ? '' : 'is-loading'}`} style={{ '--main': mainColor }}>
        <section className="pokedex__half pokedex__half--left" aria-label="Pokédex screen">
          <Bezel
            className="bezel--photo"
            screenClassName="photo"
            onButton={playCry}
            buttonLabel="Play cry"
            buttonText="Cry"
            buttonIcon="sound"
            buttonDisabled={!data || !data.cry}
          >
            <div className="photo__stage">{photo}</div>
            <p className="photo__caption">{caption}</p>
          </Bezel>

          <div className="panel">
            <div className="panel__row panel__row--buttons">
              <Link to="/" className="black-button" aria-label="Back to the list" title="Back to the list (Esc)">
                <span className="engraved">Back</span>
              </Link>
              <button type="button" className={`pill pill--red ${shiny ? 'is-on' : ''}`} onClick={() => setShiny((s) => !s)} aria-pressed={shiny}>
                <span className="engraved">Shiny</span>
              </button>
              <button type="button" className={`pill pill--green ${artwork ? 'is-on' : ''}`} onClick={() => setArtwork((a) => !a)} aria-pressed={artwork}>
                <span className="engraved">Artwork</span>
              </button>
            </div>

            <div className="panel__row">
              <div className="lcd lcd--green lcd--readout">
                <p>{`Gen: ${gen.label.replace('Gen ', '')} ${gen.region}`}</p>
                {data ? (
                  <>
                    <p className="lcd__abilities">
                      {'Abil: '}
                      {data.abilities.map((a) => (
                        <span key={a.name} className={a.hidden ? 'is-hidden' : ''} title={a.hidden ? 'Hidden ability' : undefined}>
                          {formatName(a.name)}
                        </span>
                      ))}
                    </p>
                    <p>
                      {'Sex: '}
                      {genderLabel(data.genderRate).join(' / ')}
                    </p>
                    <p>{`Catch rate: ${data.captureRate}`}</p>
                  </>
                ) : <p className="blink">Loading…</p>}
              </div>
              <Dpad
                onUp={() => setShiny((s) => !s)}
                onDown={() => setArtwork((a) => !a)}
                onLeft={prev ? goPrev : undefined}
                onRight={next ? goNext : undefined}
              />
            </div>
          </div>
        </section>

        <div className="pokedex__hinge" aria-hidden="true">
          <span />
          <span />
        </div>

        <section className="pokedex__half pokedex__half--right" aria-label="Pokédex data">
          <div className="lcd lcd--blue">{info}</div>

          <div className="stat-keys" aria-label="Base stats">
            {data ? (
              <>
                {data.stats.map((s) => (
                  <StatKey
                    key={s.name}
                    label={statLabels[s.name] || s.name}
                    value={s.value}
                    ratio={s.value / MAX_STAT}
                    color={statColor(s.value)}
                  />
                ))}
                <StatKey label="TOTAL" value={total} ratio={total / 720} color="#fff" />
                <StatKey label="HEIGHT" value={data.height} display={`${data.height.toFixed(1)} m`} />
                <StatKey label="WEIGHT" value={data.weight} display={`${data.weight.toFixed(1)} kg`} />
                <StatKey label="EXP" value={data.baseExperience || 0} display={data.baseExperience ? String(data.baseExperience) : '—'} />
              </>
            ) : Array.from({ length: 10 }, (_, i) => <div key={i} className="stat-key is-empty" />)}
          </div>

          <div className="lid-controls">
            <div className="white-keys">
              <WhiteKey pokemon={prev} direction="prev" />
              <WhiteKey pokemon={next} direction="next" />
            </div>
            <div className="lid-controls__side">
              <span className={`mini-pill mini-pill--red ${shiny ? 'is-on' : ''}`} aria-hidden="true" />
              <span className={`mini-pill mini-pill--green ${artwork ? 'is-on' : ''}`} aria-hidden="true" />
              <button type="button" className="yellow-button" onClick={randomPokemon} aria-label="Random Pokémon" title="Random Pokémon">
                <span className="engraved">Random</span>
              </button>
            </div>
          </div>

          <div className="mini-screens" aria-label="Types">
            <TypeScreen type={data ? data.types[0] : null} />
            <TypeScreen type={data ? data.types[1] : null} />
          </div>
        </section>

        <section className="pokedex__evo lcd lcd--blue" aria-label="Evolution chain">
          <h2 className="evo__title">Evolution</h2>
          {data
            ? <Evolutions stages={data.evolutions} currentId={data.id} />
            : <p className="evo__empty blink">Loading…</p>}
        </section>
      </article>
      <p className="hint">Tip: use ← → to browse, Esc to go back. The red button plays the cry.</p>
    </>
  );
}

export default Detail;
