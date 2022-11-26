import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  // render the app
  const user = userEvent.setup();
  render(<App />);
  // app ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  await user.click(cherriesCheckbox);

  //find and click order button

  const orderSummaryButton = screen.getByRole('button', {
    name: 'Order sundae',
  });
  await user.click(orderSummaryButton);

  //check summary information based on order

  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', {
    name: 'Scoops total: $6.00',
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings total: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla').toBeInTheDocument);
  expect(screen.getByText('2 Chocolate').toBeInTheDocument);
  expect(screen.getByText('Cherries').toBeInTheDocument);

  // accept terms and conditions and clik button to confirm order
  const termsAndConditions = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditions);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  // check confirmation page text
  // const thankYouHeader = await screen.findByRole('heading', {
  //   name: /Thank you/i,
  // });
  // expect(thankYouHeader).toBeInTheDocument();

  // // expect that loading has disappeared
  // const notLoading = screen.queryByText('loading');
  // expect(notLoading).not.toBeInTheDocument();

  // const orderNumber = await screen.findByText(/Your order number is/i);
  // expect(orderNumber).toBeInTheDocument();

  // //click new order button on confirmation page
  // const newOrder = screen.getByRole('button', { name: /Create new Order/i });
  // await user.click(newOrder);
  // //check that scoops and topping subtotals have been reset

  // const scoopsTotal = await screen.findByText('Scoops total: $0.00');
  // expect(scoopsTotal).toBeInTheDocument();
  // const toppingTotals = await screen.findByText('Toppings total: $0.00');
  // expect(toppingTotals).toBeInTheDocument();

  // //do we need to await to avoid test
  // await screen.findByRole('spinbutton', { name: 'Vanilla' });
  // await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('Topping header isnt on summary page if no topping ordered', async () => {
  const user = userEvent.setup();
  render(<App />);

  //add just ice cream without topping
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  // find and order summary btn

  const orderSummaryBtn = screen.getByRole('button', {
    name: /Order sundae/i,
  });

  await user.click(orderSummaryBtn);

  const scoopsHeading = screen.getByRole('heading', {
    name: 'Scoops total: $6.00',
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingHeading = screen.queryByRole('heading', { name: /topping/i });
  expect(toppingHeading).not.toBeInTheDocument();
});

test('Topping header is not on summary page if topping ordered, then removed', async () => {
  const user = userEvent.setup();
  render(<App />);

  //add ice cream scoop

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  //add toping and confirm

  const cherriesToping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await user.click(cherriesToping);
  expect(cherriesToping).toBeChecked();
  const toppingTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingTotal).toHaveTextContent('1.50');

  //remove topping

  await user.click(cherriesToping);

  expect(cherriesToping).not.toBeChecked();
  expect(toppingTotal).toHaveTextContent('0.00');

  // find and click summary btn

  const orderSummaryBtn = screen.getByRole('button', {
    name: /Order sundae/i,
  });

  await user.click(orderSummaryBtn);

  const scoopsHeading = screen.getByRole('heading', {
    name: 'Scoops total: $2.00',
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
