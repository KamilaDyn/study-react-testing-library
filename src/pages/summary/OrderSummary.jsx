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

  const hasToppings = totals.toppings > 0;
  let toppingDisplay = null;

  if (hasToppings) {
    const toppingArray = Object.keys(optionCounts.toppings); //["M&ms", ...]
    const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

    toppingDisplay = (
      <>
        <h2>Toppings total: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops total: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
