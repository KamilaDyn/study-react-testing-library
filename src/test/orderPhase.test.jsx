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
    name: 'Order Summary',
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

  const confirmOrderBtn = screen.getByRole('button', /Confirm order/i);
  expect(confirmOrderBtn).toBeEnabled();
  await user.click(confirmOrderBtn);
  // confirm order number on confirmation page

  const thankYouHeader = screen.getByRole('heading', { name: /Thank you!/i });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText('Your order number is', {
    exact: false,
  });
  expect(orderNumber).toBeInTheDocument();

  //click new order button on confirmation page
  const newOrder = screen.getByRole('button', { name: /Create new Order/i });
  await user.click(newOrder);
  //check that scoops and topping subtotals have been reset

  const scoopsTotal = await screen.findByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingTotals = await screen.findByText('Toppings total: $0.00');
  expect(toppingTotals).toBeInTheDocument();

  //do we need to await to avoid test
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
