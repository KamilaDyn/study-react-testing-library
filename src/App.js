import './App.css';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages';
import { OrderDetailsProvider } from './context';
import { useState } from 'react';
import OrderSummary from './pages/summary/OrderSummary';
import OrderCompleted from './pages/completed/OrderCompleted';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderCompleted;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Container>
          <Component setOrderPhase={setOrderPhase} />
        </Container>{' '}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
