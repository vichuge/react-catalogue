import { screen, fireEvent } from '@testing-library/react';
import Home from '../containers/Home';
import { renderWithStore, sampleItems } from './testUtils';

const loaded = { pokemons: { status: 'succeeded', items: sampleItems, error: null } };

describe('Home', () => {
  it('shows skeletons while loading', () => {
    const { container } = renderWithStore(<Home />, {
      preloadedState: { pokemons: { status: 'loading', items: [], error: null } },
    });
    expect(container.querySelectorAll('.card--skeleton').length).toBeGreaterThan(0);
  });

  it('lists every Pokémon with its number and types', () => {
    renderWithStore(<Home />, { preloadedState: loaded });
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#0906')).toBeInTheDocument();
    expect(screen.getByText('Mr. Mime')).toBeInTheDocument();
    expect(screen.getByText(/of 6 Pokémon/)).toBeInTheDocument();
  });

  it('filters by generation and search', () => {
    renderWithStore(<Home />, { preloadedState: loaded });
    fireEvent.click(screen.getByRole('button', { name: /Gen II\b/ }));
    expect(screen.getByText('Chikorita')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /All National/ }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'char' } });
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });

  it('shows an empty state that can clear the filters', () => {
    renderWithStore(<Home />, { preloadedState: loaded });
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'missingno' } });
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Clear filters' })[0]);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
