import React from 'react';
import renderer from 'react-test-renderer';
import CategoryFilter from '../components/CategoryFilter';

it('return CategoryFilter component', () => {
  const clickHandle = () => { };
  const tree = renderer
    .create(<CategoryFilter categoryFilterChange={clickHandle} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
