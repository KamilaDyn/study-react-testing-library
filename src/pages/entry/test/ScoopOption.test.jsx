import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('indiacte if scoop count is non-int or out of range', async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  // input has negative number
  const vanillaInput = screen.getByRole('spinbutton');
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  //replace with decimal number

  await user.clear(vanillaInput);
  user.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  //replace with input too hight

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
