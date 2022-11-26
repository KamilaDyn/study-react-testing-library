import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('displays images for each scoops from the server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display imges for each tooping from the server', async () => {
  render(<Options optionType="toppings" />);

  const toppingImage = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImage).toHaveLength(3);

  const altText = toppingImage.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test('dont update total if scoops is invalid', async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2.5');

  expect(scoopsSubtotal).toHaveTextContent('$0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '100');
  expect(scoopsSubtotal).toHaveTextContent('$0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(scoopsSubtotal).toHaveTextContent('$0.00');
});
