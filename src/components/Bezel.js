import PropTypes from 'prop-types';
import Icon from './Icon';

/**
 * The off-white screen frame of the Pokédex: two red dots on top, a cut
 * bottom-left corner with the big red button and the speaker grille.
 */
function Bezel({
  children, className = '', screenClassName = '', onButton = null, buttonLabel = '',
  buttonText = '', buttonIcon = null, buttonDisabled = false,
}) {
  return (
    <div className={`bezel ${className}`}>
      <div className="bezel__dots" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className={`bezel__screen ${screenClassName}`}>{children}</div>
      <div className="bezel__bottom">
        {onButton ? (
          <button
            type="button"
            className="bezel__action"
            onClick={onButton}
            aria-label={buttonLabel}
            title={buttonLabel}
            disabled={buttonDisabled}
          >
            <span className="big-red-button" />
            {buttonText && (
              <span className="bezel__label" aria-hidden="true">
                {buttonIcon && <Icon name={buttonIcon} size={14} />}
                {buttonText}
              </span>
            )}
          </button>
        ) : <span className="big-red-button" aria-hidden="true" />}
        <span className="speaker" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}

Bezel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  screenClassName: PropTypes.string,
  onButton: PropTypes.func,
  buttonLabel: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  buttonDisabled: PropTypes.bool,
};

export default Bezel;
