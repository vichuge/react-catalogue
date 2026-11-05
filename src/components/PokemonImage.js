import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

/** Image that walks through a list of sources until one loads. */
function PokemonImage({
  sources, alt, className = '', lazy = true, pixelated = false,
}) {
  const valid = sources.filter(Boolean);
  const key = valid.join('|');
  const [state, setState] = useState({ key, index: 0, loaded: false });

  // Sources changed (e.g. shiny toggle): reset during render instead of in an
  // effect, so a reset can never overwrite a load event that already fired.
  let { index, loaded } = state;
  if (state.key !== key) {
    index = 0;
    loaded = false;
    setState({ key, index, loaded });
  }

  const markLoaded = useCallback(() => {
    setState((s) => (s.loaded ? s : { ...s, loaded: true }));
  }, []);

  // Cached images (e.g. when coming back to the list) can finish loading
  // before React attaches onLoad, so check `complete` as soon as it mounts.
  const imgRef = useCallback((img) => {
    if (img && img.complete && img.naturalWidth > 0) markLoaded();
  }, [markLoaded]);

  if (index >= valid.length) {
    return <span className={`poke-img-fallback ${className}`} role="img" aria-label={alt} />;
  }

  return (
    <img
      ref={imgRef}
      src={valid[index]}
      alt={alt}
      className={`poke-img ${pixelated ? 'is-pixelated' : ''} ${loaded ? 'is-loaded' : ''} ${className}`}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onLoad={markLoaded}
      onError={() => setState((s) => ({ ...s, index: s.index + 1, loaded: false }))}
    />
  );
}

PokemonImage.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  lazy: PropTypes.bool,
  pixelated: PropTypes.bool,
};

export default PokemonImage;
