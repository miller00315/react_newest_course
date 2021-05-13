import './styles.css';

export const Button = ({onClick, label, disabled}) => (<button disabled={disabled} className='button' onClick={onClick}>{label}</button>);