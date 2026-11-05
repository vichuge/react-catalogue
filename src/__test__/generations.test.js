import generations, { generationOf, TOTAL_POKEMON } from '../constants/generations';

describe('generations', () => {
  it('covers all nine generations', () => {
    expect(generations).toHaveLength(9);
    expect(TOTAL_POKEMON).toBe(1025);
  });

  it('has contiguous ranges with no gaps', () => {
    generations.forEach((gen, i) => {
      if (i === 0) expect(gen.from).toBe(1);
      else expect(gen.from).toBe(generations[i - 1].to + 1);
    });
  });

  it('finds the generation of a Pokémon', () => {
    expect(generationOf(1).region).toBe('Kanto');
    expect(generationOf(493).region).toBe('Sinnoh');
    expect(generationOf(1025).region).toBe('Paldea');
    expect(generationOf(2000)).toBeUndefined();
  });
});
