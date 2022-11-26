import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context';
import axios from 'axios';

export default function OrderCompleted(props) {
  const { setOrderPhase } = props;
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  return (
    <Container>
      <h2>Thank you!</h2>
      <p>Your order number is {orderNumber} </p>
      <Button
        onClick={() => {
          setOrderPhase('inProgress');
          resetOrder();
        }}
      >
        Create new Order
      </Button>
    </Container>
  );
}
