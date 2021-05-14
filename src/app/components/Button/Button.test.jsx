import { render, screen } from '@testing-library/react';
import { Button } from '.'

describe('<Button />', () => {
    it('Should render a button with a text', () => {
        render(<Button label='test'/>);

        expect.assertions(1);

        const button = screen.getByRole('button', {name: /test/i});

        expect(button).toHaveAttribute('class', 'button');
    });

    it('Should call function on button click', () => {
        const fakeFunction = jest.fn();

        render(<Button label='test' onClick={fakeFunction}/>);

        screen.getByRole('button', {name: /test/i}).click();

        expect(fakeFunction).toHaveBeenCalledTimes(1)
    });

    it('Should be disabled when [disabled] is true', () => {
        render(<Button label='test' disabled={true}/>);

        const button = screen.getByRole('button', {name: /test/i});

        expect(button).toBeDisabled();
    });

    it('Should be enabled when [disabled] is false', () => {
        render(<Button label='test' disabled={false}/>);

        const button = screen.getByRole('button', {name: /test/i});

        expect(button).toBeEnabled();
    });
});