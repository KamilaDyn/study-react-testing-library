import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has initial color', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to red' });

  // expect the bgc color to be green
  expect(colorButton).toHaveStyle({ backgroundColor: 'green' });
});
//check behaviour
test('button turns red and change text when click', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to red' });

  fireEvent.click(colorButton);

  // expect the background color to be red

  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  //expect the button text to be 'Chnage to green'

  expect(colorButton).toHaveTextContent('Change to green');
});

test('initial conditions for check button', () => {
  render(<App />);
  // check that the button starts to be enabled

  const colorButton = screen.getByRole('button', { name: 'Change to red' });
  expect(colorButton).toBeEnabled();

  //check that the checkbox start out unchecked

  const checkbox = screen.getByRole('checkbox', { name: 'Enable button' });
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test('change button by click checkbox', () => {
  render(<App />);
  const button = screen.getByRole('button', {
    name: 'Change to blue',
  });
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  const checkbox = screen.getByRole('checkbox', {
    name: 'Disable button',
  });
  expect(checkbox).toBeChecked();
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'blue' });
  expect(button).toBeEnabled();

  fireEvent.click(button);
  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ backgroundColor: 'gray' });
});

describe('space before camel-case capital letter', () => {
  test('Works for no inner capital letter', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital case letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiply capital case letter', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
