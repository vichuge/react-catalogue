import { screen, fireEvent } from '@testing-library/react';
import Detail from '../containers/Detail';
import { renderWithStore, sampleItems } from './testUtils';
import { fetchPokemonDetail } from '../api/pokeapi';

jest.mock('../api/pokeapi', () => ({
  ...jest.requireActual('../api/pokeapi'),
  fetchPokemonDetail: jest.fn(),
}));

const bulbasaur = {
  id: 1,
  name: 'bulbasaur',
  genus: 'Seed Pokémon',
  flavor: 'A strange seed was planted on its back at birth.',
  height: 0.7,
  weight: 6.9,
  types: ['grass', 'poison'],
  abilities: [{ name: 'overgrow', hidden: false }, { name: 'chlorophyll', hidden: true }],
  stats: [
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 65 },
    { name: 'speed', value: 45 },
  ],
  cry: null,
  captureRate: 45,
  genderRate: 1,
  isLegendary: false,
  isMythical: false,
  sprites: {
    animated: 'a.gif', animatedShiny: 'as.gif', artwork: 'a.png', artworkShiny: 'as.png',
  },
  evolutions: [[{ id: 1, name: 'bulbasaur' }], [{ id: 2, name: 'ivysaur' }], [{ id: 3, name: 'venusaur' }]],
};

const items = [...sampleItems.slice(0, 1), { id: 2, name: 'ivysaur', types: ['grass'] }];

const state = (entry) => ({
  pokemons: { status: 'succeeded', items, error: null },
  profile: { 1: entry, 2: { status: 'succeeded', data: { ...bulbasaur, id: 2 }, error: null } },
});

const renderDetail = (entry) => renderWithStore(<Detail />, {
  preloadedState: state(entry), route: '/pokemon/1', path: '/pokemon/:id',
});

describe('Detail', () => {
  it('renders the full profile', () => {
    renderDetail({ status: 'succeeded', data: bulbasaur, error: null });
    expect(screen.getByRole('heading', { level: 1, name: 'Bulbasaur' })).toBeInTheDocument();
    expect(screen.getByText('Seed Pokémon')).toBeInTheDocument();
    expect(screen.getByText('0.7 m')).toBeInTheDocument();
    expect(screen.getByText('6.9 kg')).toBeInTheDocument();
    expect(screen.getByText('Gen I · Kanto')).toBeInTheDocument();
    expect(screen.getByText('318')).toBeInTheDocument(); // stat total
    expect(screen.getByRole('link', { name: /Venusaur/ })).toHaveAttribute('href', '/pokemon/3');
    expect(screen.getByRole('link', { name: /#0002 Ivysaur/ })).toBeInTheDocument();
  });

  it('toggles shiny mode', () => {
    const { container } = renderDetail({ status: 'succeeded', data: bulbasaur, error: null });
    const shiny = screen.getByRole('button', { name: /Shiny/ });
    fireEvent.click(shiny);
    expect(shiny).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.detail__display img')).toHaveAttribute('src', 'as.gif');
  });

  it('retries a failed request and offers a manual retry', async () => {
    fetchPokemonDetail.mockRejectedValue(new Error('Request failed (500)'));
    renderDetail({ status: 'failed', data: null, error: 'Request failed (500)' });
    expect(await screen.findByText('Could not load this Pokémon.')).toBeInTheDocument();
    expect(screen.getByText('Request failed (500)')).toBeInTheDocument();
    expect(fetchPokemonDetail).toHaveBeenCalledWith(1);

    fetchPokemonDetail.mockResolvedValue(bulbasaur);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Bulbasaur' })).toBeInTheDocument();
  });

  it('rejects unknown numbers', () => {
    renderWithStore(<Detail />, { route: '/pokemon/9999', path: '/pokemon/:id' });
    expect(screen.getByText('That Pokémon is not in the Pokédex.')).toBeInTheDocument();
  });
});
