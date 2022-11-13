import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';
const OrderDetails = createContext();

// create custom hook to check weather we're in a provider

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'userOrder Details must be called from within an OrderDetailsProvider'
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, //{Chocolate:1, Vanilla:2}
    toppings: {}, //{"Gummi Bear:1"}
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    //update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // updte the state with the new updated copy

    setOptionCounts(newOptionCounts);
  }
  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  //utility function to drive totals from optionalCounts state value
  function calculateTotal(optionType) {
    //get an array of counts for the option type ( for example [1,2])
    const countsArray = Object.values(optionCounts[optionType]);

    // total the values in the array of counts for the number of ite,
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    // multiply the ntotal number of items by the price for  this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };
  const value = { optionCounts, totals, updateItemCount, resetOrder };

  return <OrderDetails.Provider value={value} {...props} />;
}
