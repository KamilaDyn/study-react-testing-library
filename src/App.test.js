import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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

test('initial conditions', () => {
  render(<App />);
  // check that the button starts to be enabled

  const colorButton = screen.getByRole('button', { name: 'Change to red' });
  expect(colorButton).toBeEnabled();

  //check that the checkbox start out unchecked

  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();
});
