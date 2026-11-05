import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Home from '../containers/Home';
import Detail from '../containers/Detail';
import { loadPokedex } from '../redux/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPokedex());
  }, [dispatch]);

  return (
    <div className="dex">
      <Navbar />
      <main className="dex-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
          <Route path="/pokemonid/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="dex-footer">
        Data &amp; sprites from
        {' '}
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a>
        . Pokémon © Nintendo / Game Freak.
      </footer>
    </div>
  );
}

export default App;
