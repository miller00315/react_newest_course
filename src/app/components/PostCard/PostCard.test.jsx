import { render, screen } from '@testing-library/react';
import {PostCard} from './index'

const postMock = {
    title: 'testTitle',
    body: 'testBody',
    id: 1,
    cover: 'img/img.png'
}

describe('<PostCard />', () => {
    it('Should render a PostCard correctly', () => {
        render(<PostCard post={postMock} />);

        expect(screen.getByRole('img', {name: 'testTitle'})).toHaveAttribute('src', postMock.cover);

        expect(screen.getByText('testTitle')).toBeInTheDocument();

        expect(screen.getByText('testBody')).toBeInTheDocument();
    });

    it('Should match a snapshot', () => {
      const { container } = render(<PostCard post={postMock} />);

      expect(container.firstChild).toMatchSnapshot();
    });
});