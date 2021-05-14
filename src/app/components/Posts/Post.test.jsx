import { render, screen } from '@testing-library/react';
import {Posts} from '.';

const mockedPosts = [{
        title: 'testTitle1',
        body: 'testBody1',
        id: 1,
        cover: 'img/img1.png'
    },
    {
        title: 'testTitle2',
        body: 'testBody2',
        id: 2,
        cover: 'img/img2.png'
    },
    {
        title: 'testTitle3',
        body: 'testBody3',
        id: 3,
        cover: 'img/img3.png'
    },
];

describe('<Post />', () => {
    it('Should render posts', () => {
        render(<Posts posts={mockedPosts}/>);

        expect(screen.getAllByRole('heading', {name: /title/i})).toHaveLength(3);
        expect(screen.getAllByRole('img', {name: /title/i})).toHaveLength(3);
        expect(screen.getAllByText(/body/i)).toHaveLength(3);
    });

    it('Should match snapshot', () => {
        const container = render(<Posts posts={mockedPosts}/>);

        expect(container.firstChild).toMatchSnapshot();
    });
});