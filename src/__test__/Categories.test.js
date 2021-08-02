import Categories from '../containers/Categories';

it('return Categories list', () => {
  const list = Categories;
  expect(list).toStrictEqual(['gen-1', 'gen-2', 'gen-3']);
  expect(list).not.toBe('');
  expect(list[0]).toBe('gen-1');
  expect(list[0]).not.toBe('gen-2');
});
