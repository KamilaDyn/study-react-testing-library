import Options from './Options';
import { useOrderDetails } from '../../context';
import { formatCurrency } from '../../utilities';
import { Container, Button } from 'react-bootstrap';

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  const disableOrder = totals.scoops === 0;
  return (
    <div>
      <h1>Design your Sunday!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <Container style={{ marginTop: '20px' }}>
        <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
        <Button disabled={disableOrder} onClick={() => setOrderPhase('review')}>
          Order sundae
        </Button>
      </Container>
    </div>
  );
}
