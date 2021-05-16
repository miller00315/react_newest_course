import P from 'prop-types';
import './styles.css';

export const Button = ({ onClick, label, disabled = false }) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    {label}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  label: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
