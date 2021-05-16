import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com/*', async (_, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 1,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          userId: 1,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('Should render search, posts and load more', async () => {
    render(<Home postPerPage={2} />);

    expect.assertions(3);

    const noMorePosts = screen.getByText('Não existem posts');

    const search = screen.getByPlaceholderText(/Type your search/i);

    await waitForElementToBeRemoved(noMorePosts);

    expect(search).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(2);

    const button = screen.getByRole('button', /Load more posts/i);

    expect(button).toBeInTheDocument(button);
  });

  it('Should search for posts', async () => {
    render(<Home postPerPage={2} />);

    const noMorePosts = screen.getByText('Não existem posts');

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();

    userEvent.type(search, 'title1');

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();

    userEvent.clear(search);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    userEvent.type(search, 'nothing');

    expect(screen.getByText('Não existem posts')).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title1' })).not.toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
  });

  it('Should load more posts when button "Load more posts" is clicked', async () => {
    render(<Home postPerPage={2} />);

    const noMorePosts = screen.getByText('Não existem posts');

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load more posts/i });

    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();

    expect(button).toBeDisabled();
  });
});
