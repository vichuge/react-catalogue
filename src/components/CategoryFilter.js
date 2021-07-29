import React from 'react';
import PropTypes from 'prop-types';
import categories from '../containers/Categories';

const CategoryFilter = ({ categoryFilterChange }) => {
  const handleChange = (e) => {
    categoryFilterChange(e.target.value);
  };
  return (
    <select className="form-control mt-2" onChange={handleChange}>
      <option key="default" value="All">All books</option>
      {
        categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)
      }
    </select>
  );
};

CategoryFilter.propTypes = {
  categoryFilterChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
