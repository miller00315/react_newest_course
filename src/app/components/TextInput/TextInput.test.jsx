import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TextInput} from '.';

describe('<TextInput />', () => {
    it('Should have a value', () => {
        const fakeFunction = jest.fn();

        const {debug} = render(<TextInput handleTextChange={fakeFunction} value={'test'} />);

        debug();

        const input = screen.getByPlaceholderText(/Type your search/i);

        expect(input).toBeInTheDocument();

        expect(input.value).toBe('test');
    });

    it('Should render a call handleChange function on each key pressed', () => {
        const fakeFunction = jest.fn();

        render(<TextInput handleTextChange={fakeFunction} />);
        
         const input = screen.getByPlaceholderText(/Type your search/i);

         const value = 'value';

         userEvent.type(input, value);

         expect(input.value).toBe(value);

         expect(fakeFunction).toHaveBeenCalledTimes(value.length);
    });

    it('Should match snapshot', () => {

        const fakeFunction = jest.fn();

        const {container} = render(<TextInput handleTextChange={fakeFunction} />);

        expect(container).toMatchSnapshot();
    });
});