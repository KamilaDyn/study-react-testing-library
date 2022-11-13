import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../context';

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything

export * from '@testing-library/react';

//override render export
export { renderWithContext as render };
