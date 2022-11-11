import { Col } from 'react-bootstrap';
export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}
