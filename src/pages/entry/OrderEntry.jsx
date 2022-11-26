import Options from './Options';
import { useOrderDetails } from '../../context';
import { formatCurrency } from '../../utilities';
import { Container, Button } from 'react-bootstrap';

export default function OrderEntry(props) {
  const { totals } = useOrderDetails();
  const { setOrderPhase } = props;
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <Container style={{ marginTop: '20px' }}>
        <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
        <Button onClick={() => setOrderPhase('review')}>Order Summary</Button>
      </Container>
    </div>
  );
}
