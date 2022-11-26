import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context';
import axios from 'axios';
import AlertBanner from '../common/AlertBanner';

export default function OrderCompleted({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        setError(true);
      });
  }, []);
  const handleClick = () => {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  };
  const newOrderButton = (
    <>
      <Button onClick={handleClick}>Create new Order</Button>
    </>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber) {
    return (
      <Container>
        <h2>Thank you</h2>
        <p>Your order number is {orderNumber} </p>
        {newOrderButton}
      </Container>
    );
  } else {
    return <div>loading</div>;
  }
}
