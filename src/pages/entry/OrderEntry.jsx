import Options from './Options';
import { useOrderDetails } from '../../context';
import { formatCurrency } from '../../utilities';
import { Container } from 'react-bootstrap';

export default function OrderEntry() {
  const { totals } = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <Container style={{ marginTop: '20px' }}>
        <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      </Container>
    </div>
  );
}
