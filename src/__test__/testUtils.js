import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import setupStore from '../redux/store';
import routerFuture from '../routerFuture';

export const sampleItems = [
  { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', types: ['fire'] },
  { id: 25, name: 'pikachu', types: ['electric'] },
  { id: 152, name: 'chikorita', types: ['grass'] },
  { id: 122, name: 'mr-mime', types: ['psychic', 'fairy'] },
  { id: 906, name: 'sprigatito', types: ['grass'] },
];

export const renderWithStore = (ui, { preloadedState, route = '/', path = '/' } = {}) => {
  const store = setupStore(preloadedState);
  const utils = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]} future={routerFuture}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
  return { store, ...utils };
};
