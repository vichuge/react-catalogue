import {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonCard from '../components/PokemonCard';
import Filters from '../components/Filters';
import Icon from '../components/Icon';
import Bezel from '../components/Bezel';
import { changeFilter, resetFilter, loadPokedex } from '../redux/actions';
import { filterPokemons } from '../redux/selectors';

const PAGE_SIZE = 60;

// Survives route changes so "back" lands exactly where the user left the list.
const memory = { key: null, visible: PAGE_SIZE, scrollY: 0 };

function SkeletonGrid() {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => <div key={i} className="card card--skeleton" />)}
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const { status, items, error } = useSelector((state) => state.pokemons);
  const filter = useSelector((state) => state.filter);
  const filterKey = `${filter.generation}|${filter.type}|${filter.query}`;

  const filtered = useMemo(() => filterPokemons(items, filter), [items, filter]);
  const [visible, setVisible] = useState(() => (
    memory.key === filterKey ? memory.visible : PAGE_SIZE
  ));
  const [showTop, setShowTop] = useState(false);
  const sentinel = useRef(null);
  const previousKey = useRef(filterKey);
  const restoreTo = useRef(memory.key === filterKey ? memory.scrollY : 0);
  const active = useRef(true);

  // New filters → start again from the top of the results.
  useEffect(() => {
    memory.key = filterKey;
    if (previousKey.current === filterKey) return;
    previousKey.current = filterKey;
    memory.scrollY = 0;
    setVisible(PAGE_SIZE);
  }, [filterKey]);

  useEffect(() => {
    memory.visible = visible;
  }, [visible]);

  // Restore the scroll position when coming back from a detail page.
  useLayoutEffect(() => {
    if (restoreTo.current && items.length) {
      window.scrollTo({ top: restoreTo.current, behavior: 'instant' });
      restoreTo.current = 0;
    }
  }, [items.length]);

  // Save the position *before* the DOM is removed: once the list is gone the
  // browser clamps the scroll and fires a late scroll event we must ignore.
  useLayoutEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      memory.scrollY = window.scrollY;
    };
  }, []);

  // Infinite scroll: render the next page when the sentinel gets close.
  useEffect(() => {
    const node = sentinel.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible((v) => v + PAGE_SIZE);
    }, { rootMargin: '800px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length, visible]);

  useEffect(() => {
    const onScroll = () => {
      if (!active.current) return;
      memory.scrollY = window.scrollY;
      setShowTop(window.scrollY > 900);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onChange = useCallback((changes) => dispatch(changeFilter(changes)), [dispatch]);
  const onReset = useCallback(() => dispatch(resetFilter()), [dispatch]);

  const shown = filtered.slice(0, visible);

  let content;
  if (status === 'failed') {
    content = (
      <div className="empty">
        <p className="empty__title">The Pokédex could not connect.</p>
        <p>{error}</p>
        <button type="button" className="button" onClick={() => dispatch(loadPokedex())}>Try again</button>
      </div>
    );
  } else if (status !== 'succeeded') {
    content = <SkeletonGrid />;
  } else if (filtered.length === 0) {
    content = (
      <div className="empty">
        <span className="poke-img-fallback empty__ball" />
        <p className="empty__title">No Pokémon found</p>
        <p>Try another name, number, generation or type.</p>
        <button type="button" className="button" onClick={onReset}>Clear filters</button>
      </div>
    );
  } else {
    content = (
      <>
        <div className="grid">
          {shown.map((p) => <PokemonCard key={p.id} id={p.id} name={p.name} types={p.types} />)}
        </div>
        {visible < filtered.length && (
          <div ref={sentinel} className="load-more">
            <button type="button" className="button button--ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Load more
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Filters
        filter={filter}
        onChange={onChange}
        onReset={onReset}
        shown={filtered.length}
        total={status === 'succeeded' ? items.length : 0}
      />
      <Bezel
        className="bezel--list"
        onButton={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        buttonLabel="Back to top"
        buttonText="Top"
        buttonIcon="up"
      >
        {content}
      </Bezel>
      <button
        type="button"
        className={`to-top ${showTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon name="up" />
      </button>
    </>
  );
}

export default Home;
