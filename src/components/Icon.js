import PropTypes from 'prop-types';

const paths = {
  search: 'M10.5 3a7.5 7.5 0 0 1 5.96 12.05l4.25 4.24-1.42 1.42-4.24-4.25A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z',
  close: 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z',
  back: 'M15.4 4.6 8 12l7.4 7.4-1.4 1.4L5.2 12 14 3.2l1.4 1.4Z',
  next: 'M8.6 19.4 16 12 8.6 4.6 10 3.2l8.8 8.8-8.8 8.8-1.4-1.4Z',
  up: 'M4.6 15.4 12 8l7.4 7.4-1.4 1.4-6-6-6 6-1.4-1.4Z',
  sparkle: 'M12 2l2.2 6.3L20.5 10.5l-6.3 2.2L12 19l-2.2-6.3L3.5 10.5l6.3-2.2L12 2Zm7 12 1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8Z',
  sound: 'M3 9h4l5-4v14l-5-4H3V9Zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-8.8v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6Z',
  image: 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9.6l4-4 3.5 3.5 2.5-2.5 4 4V6H5Zm10.5 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z',
};

function Icon({ name, size = 20, className = undefined }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d={paths[name]} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(paths)).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Icon;
