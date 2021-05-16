import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';

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
    render(<Home />);

    expect.assertions(3);

    const noMorePosts = screen.getByText('Não existem posts');

    const search = screen.getByPlaceholderText(/Type your search/i);

    await waitForElementToBeRemoved(noMorePosts);

    expect(search).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(2);

    const button = screen.getByRole('button', /Load more posts/i);

    expect(button).toBeInTheDocument(button);
  });
});
