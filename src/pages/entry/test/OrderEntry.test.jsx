import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';

test('handle error for scoops and topping rotes ', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button if there are no scoops ordered', async () => {
  const user = userEvent.setup();

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole('button', { name: /Order sundae/i });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});
