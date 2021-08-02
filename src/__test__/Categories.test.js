import Categories from '../containers/Categories';

describe('Test for Categories', () => {
  it('return Categories list', () => {
    expect(Categories).toStrictEqual(['gen-1', 'gen-2', 'gen-3']);
  });

  it('Not return Categories list', () => {
    expect(Categories).not.toBe('');
  });

  it('Return first element', () => {
    expect(Categories[0]).toBe('gen-1');
  });

  it('Not Return first element', () => {
    expect(Categories[0]).not.toBe('gen-2');
  });
});
