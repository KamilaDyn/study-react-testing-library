import { Col, Form, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../context';

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount, totals } = useOrderDetails();

  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, 'toppings');
  };
  return (
    <Col xs={12} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-check`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Check type="checkbox" label={name} onChange={handleChange} />
      </Form.Group>
    </Col>
  );
}
