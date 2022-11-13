import './App.css';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages';
import { OrderDetailsProvider } from './context';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
