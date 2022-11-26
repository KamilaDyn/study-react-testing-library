import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useOrderDetails } from '../../context';

const SummaryForm = ({ setOrderPhase }) => {
  const [checked, setChecked] = useState(false);
  const { totals, optionCounts } = useOrderDetails();
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>no ice cream will actually be delivered</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to{' '}
      <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderPhase('completed');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          label={checkboxLabel}
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        />
      </Form.Group>
      <Button disabled={!checked} type="submit" variant="primary">
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
