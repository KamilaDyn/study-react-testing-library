import React from 'react';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../context';
import { formatCurrency } from '../../utilities';

export default function OrderSummary(props) {
  const { totals, optionCounts } = useOrderDetails();
  const { setOrderPhase } = props;

  const scoopArray = Object.entries(optionCounts.scoops); // [['chocolate', 2], ['vanilla', 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(optionCounts.toppings); //["M&ms", ...]
  const toppingsList = toppingArray.map((key) => <li key={key}>{key}</li>);
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops total: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings total: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
