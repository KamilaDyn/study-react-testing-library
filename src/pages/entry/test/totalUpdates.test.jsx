import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoop changes', async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();
  // make sure total start ouy $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  //update  vanilla scoop to 1  and check update
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');
  //update chocolate scoop to 2 and check update
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when topping is checked ', async () => {
  render(<Options optionType="toppings" />);
  const user = userEvent.setup();
  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  const MandMCheckbox = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });
  await user.click(MandMCheckbox);
  expect(toppingSubtotal).toHaveTextContent('1.5');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await user.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
  test('grand total updates property if scoop is added first', async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates property if topping is added as seconds', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if item is removed ', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
