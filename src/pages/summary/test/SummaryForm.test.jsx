import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('initial condition', () => {
  render(<SummaryForm />);
  const agreementCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });

  expect(agreementCheckbox).not.toBeChecked();
});

test('check if button is enabled after check checkbox', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const agreementCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const submitButton = screen.getByRole('button', {
    name: 'Confirm order',
  });

  await user.click(agreementCheckbox);
  expect(submitButton).toBeEnabled();

  await user.click(agreementCheckbox);
  expect(submitButton).toBeDisabled();
});

test('pop over response to hover', async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  //popover starts  out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears on mouseover
  const termAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  //popover disappear when mouse out
  await user.unhover(termAndConditions);
  expect(popover).not.toBeInTheDocument();
});
