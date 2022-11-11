import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays imgaes for each scoops from the server', async () => {
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
