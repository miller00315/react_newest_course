import './styles.css';

export const TextInput = ({value, handleTextChange}) => (
        <input
            className='text-input'
            type='search'
            value={value}
            onChange={handleTextChange}
            placeHolder='Type your search'
        />
    );